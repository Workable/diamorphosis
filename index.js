const deepExtend = require('deep-extend');
const dotenv = require('dotenv');

const seperator = '_';
const delimiter = ',';

const shouldLoadEnv =  exclude => !exclude || typeof exclude !== 'function' || !exclude();

const getEnvValue = (path, key) => process.env[`${path}${key}`.toUpperCase()];

const isObject = val => val && Object === val.constructor;

const replace = (config, path, key) => {
    const envValue = getEnvValue(path, key);
    if (envValue === null || typeof envValue === 'undefined') {
        return;
    }
    switch(typeof config[key]) {
        case 'number':
            return config[key] = Number(envValue);
        case 'boolean':
            return config[key] = envValue === 'true';
        case 'string':
            return config[key] = envValue;
    }
    config[key] = envValue.split(delimiter);
};

const replaceConfigFromEnv = (config, path = '') => {
    Object.keys(config).forEach(key => {
        const current = config[key];
        isObject(current) ?
            replaceConfigFromEnv(current, `${path}${key}${seperator}`) :
            replace(config, path, key);
    });
    return config;
};

module.exports = class {
    constructor({config = {}, options: {excludeEnvLoad = {}}} = {}) {
        const env = process.env.NODE_ENV;
        if (!env) {
            throw new Error('env var NODE_ENV is not defined');
        }
        const configWithNoFunctions = JSON.parse(JSON.stringify(config));
        Object.assign(this, {
            configResult: null,
            config: configWithNoFunctions,
            env,
            excludeEnvLoad
        });
    }
    getConfig() {
        if (this.configResult) {
            return this.configResult;
        }
        if (shouldLoadEnv(this.excludeEnvLoad)) {
            dotenv.load();
        }
        this.configResult = replaceConfigFromEnv(deepExtend({}, this.config.default, this.config[this.env]));
        return this.configResult;
    }
};
