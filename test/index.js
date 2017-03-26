const ConfigApp = require('../index');
const should = require('should');
const fs = require('fs');

const scenariosToRequire = [];
const scenarioFiles = fs.readdirSync(`${__dirname}/scenarios`);
scenarioFiles.forEach(filename => scenariosToRequire.push(`.\/scenarios\/${filename}`));

const scenarios = scenariosToRequire.map(scenario => require(scenario));

fs.openSync(`${__dirname}/../.env`, 'w');

function runSceanrio(scenario) {
    if (typeof scenario.input.nodeEnv === 'undefined') {
        delete process.env.NODE_ENV;
    } else {
        process.env.NODE_ENV = scenario.input.nodeEnv;
    }

    if (scenario.input.env) {
        Object.keys(scenario.input.env).forEach(envVarKey => {
            process.env[envVarKey.toUpperCase()] = scenario.input.env[envVarKey];
        });
    }

    const options = {
        config: scenario.input.config,
        options: scenario.input.options || {}
    };

    let configApp;
    if (scenario.expected.error) {
        try {
            configApp = new ConfigApp(options);
        } catch(error) {
            error.message.should.equal('env var NODE_ENV is not defined');
            return;
        }
    }

    configApp = new ConfigApp(options);

    let actual = configApp.getConfig();
    if (scenario.input.rerun) {
        actual = configApp.getConfig();
    }

    const expected = scenario.expected.config;

    if (scenario.input.env) {
        Object.keys(scenario.input.env).forEach(envVarKey =>
            delete process.env[envVarKey.toUpperCase()]);
    }

    should(actual).be.eql(expected);
}

describe('spec', () =>
        scenarios.forEach(scenario =>
                it(scenario.description, () =>
                        runSceanrio(scenario)) ) );
