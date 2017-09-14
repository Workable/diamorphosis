const config = require('../lib/main');
const should = require('should');
const fs = require('fs');

const scenariosToRequire = [];
const scenarioFiles = fs.readdirSync(`${__dirname}/scenarios`);
scenarioFiles.forEach(filename => scenariosToRequire.push(`.\/scenarios\/${filename}`));

const scenarios = scenariosToRequire.map(scenario => require(scenario));

function runSceanrio(scenario) {
  if (typeof scenario.NODE_ENV === 'undefined') {
    delete process.env.NODE_ENV;
  } else {
    process.env.NODE_ENV = scenario.NODE_ENV;
  }

  if (scenario.env) {
    Object.keys(scenario.env).forEach(envVarKey => {
      process.env[envVarKey.toUpperCase()] = scenario.env[envVarKey];
    });
  }
  delete require.cache[require.resolve('../config/config')];
  config(...scenario.input);

  let actual = require('../config/config');
  const expected = scenario.expected;

  if (scenario.env) {
    Object.keys(scenario.env).forEach(envVarKey => delete process.env[envVarKey.toUpperCase()]);
  }

  should(actual).be.eql(expected);
}

describe('spec', () => scenarios.forEach(scenario => it(scenario.description, () => runSceanrio(scenario))));
