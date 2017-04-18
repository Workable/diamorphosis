const deepExtend = require('deep-extend');
const dotenv = require('dotenv');

const envPathDelimiter = '_';
const arrayStringDelimiter = ',';

const isNullOrUndefined = (val) => val === null || typeof val === 'undefined';

const shouldLoadEnv =  exclude => !exclude || exclude.reduce((acc, val) => acc && process.NODE_ENV === val, true);

const getEnvValue = (path, key) => process.env[`${path}${key}`.toUpperCase()];

const isObject = val => val && Object === val.constructor;

const castValue = (value, type) => {
    switch(type) {
        case 'number':
            return Number(value);
        case 'boolean':
            return value === 'true';
        case 'string':
            return value;
    }
    return value.split(arrayStringDelimiter);
};

const replace = (config, path, key) => {
    const envValue = getEnvValue(path, key);

    if (isNullOrUndefined(envValue)) {
        return;
    }

    config[key] = castValue(envValue, typeof config[key]);

};

const replaceConfigFromEnv = (config, path = '') => {
    Object.keys(config).forEach(key => {
        const currentConfigValue = config[key];

        isObject(currentConfigValue) ?
            replaceConfigFromEnv(currentConfigValue, `${path}${key}${envPathDelimiter}`) :
            replace(config, path, key);
    });

    return config;
};

const loadAliases = (aliases = {}, config) => {
    Object.keys(process.env).forEach(key => {
        const currentAlias = aliases[key];

        if (!currentAlias) {
            return;
        }

        const len = currentAlias.length;

        let reference = config;

        for(let i = 0; i < len; i++) {
            const path = currentAlias[i];

            if (i === len - 1) {

                const envValue = process.env[key];
                if (!reference) {
                    break;
                }
                reference[path] = castValue(envValue, typeof reference[path]);

            } else {

                reference = config[path];

                if (!reference) {
                    break;
                }

            }

        }
    });
};

module.exports = class {
    constructor(
        {
            config = {},
            options: {
                excludeEnvLoad = [],
                aliases = {}
                }
            } = {}
    ) {

        const nodeEnv = process.env.NODE_ENV;

        const configClone = deepExtend({}, config);

        Object.assign(this, {
            computedConfig: null,
            rawConfig: configClone,
            nodeEnv,
            excludeEnvLoad,
            aliases
        });
    }

    getCachedConfig () {
        return this.computedConfig;
    }

    getConfig() {
        const cachedConfig = this.getCachedConfig();
        if (cachedConfig) {
            return cachedConfig;
        }

        const loadEnv = shouldLoadEnv(this.excludeEnvLoad);

        if (loadEnv) {
            dotenv.load();
        }

        const currentEnvConfig = this.nodeEnv ? this.rawConfig[this.nodeEnv] : {};

        const { defaults } = this.rawConfig;

        const currentEnvConfigWithDefaults = deepExtend({}, defaults, currentEnvConfig);

        this.computedConfig = replaceConfigFromEnv(currentEnvConfigWithDefaults);

        if (loadEnv) {
            loadAliases(this.aliases, this.computedConfig);
        }

        return this.computedConfig;

    }

};
