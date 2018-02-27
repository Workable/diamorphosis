const envPathDelimiter = '_';
const arrayStringDelimiter = ',';

const isNullOrUndefined = val => val === null || typeof val === 'undefined';
const getEnvValue = (path, key) => process.env[`${path}${key}`.toUpperCase()];

const isObject = val => val && Object === val.constructor;

const castValue = (value, type) => {
  switch (type) {
    case 'array':
      return value.split(arrayStringDelimiter);
    case 'number':
      return Number(value);
    case 'boolean':
      return value === 'true';
    case 'string':
    default:
      return value;
  }
};

function getType(config) {
  if (Array.isArray(config)) {
    return 'array';
  }
  return typeof config;
}

function snakeCase(str) {
  return str.replace(/(\w)([A-Z]+)/g, (_, w, W) => `${w}_${W.toLowerCase()}`);
}

const replace = (config, path, key) => {
  const envValue = getEnvValue(path, key) || getEnvValue(path, snakeCase(key));

  if (isNullOrUndefined(envValue)) {
    return;
  }

  config[key] = castValue(envValue, getType(config[key]));
};

const replaceConfigFromEnv = (config, path = '') => {
  Object.keys(config).forEach(key => {
    const currentConfigValue = config[key];

    isObject(currentConfigValue)
      ? replaceConfigFromEnv(currentConfigValue, `${path}${key}${envPathDelimiter}`)
      : replace(config, path, key);
  });

  return config;
};

function requireFileSafe(file, log = true) {
  try {
    const content = require(file);
    if (content.default && Object.keys(content).length === 1) {
      return content.default;
    }
    return content;
  } catch (e) {
    log && console.warn(`[warning] No ${file} was found.`);
  }
}

module.exports = {
  replaceConfigFromEnv,
  requireFileSafe
};
