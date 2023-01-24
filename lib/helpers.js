const envPathDelimiter = '_';
const arrayStringDelimiter = ',';

const isNullOrUndefined = val => val === null || typeof val === 'undefined';
const getEnvValue = (path, key) => process.env[`${path}${key}`.toUpperCase()];

const isObject = val => val && Object === val.constructor;

const castValue = (value, type) => {
  const defaultArrayRegExp = new RegExp('.*?\\[\\]');
  const defaultArray = type => defaultArrayRegExp.test(type);
  switch (type) {
    case 'number[]':
      console.log(value, type, value.split(arrayStringDelimiter));
      return value === ''
        ? []
        : value.split(arrayStringDelimiter).map(value => {
            const number = Number(value);
            return Number.isNaN(number) ? value : number;
          });
    case 'boolean[]':
      return value === '' ? [] : value.split(arrayStringDelimiter).map(value => value === 'true');
    case 'number':
      return Number(value);
    case 'boolean':
      return value === 'true';
    case 'string':
    default:
      if (defaultArray(type)) {
        return value === '' ? [] : value.split(arrayStringDelimiter);
      }
      return value;
  }
};

function getType(config) {
  if (Array.isArray(config)) {
    const [firstElement] = config;
    // returns number[], boolean[], string[]
    return `${typeof firstElement}[]`;
  }
  return typeof config;
}

function snakeCase(str) {
  return str.replace(/(\w)([A-Z]+)/g, (_, w, W) => `${w}_${W.toLowerCase()}`);
}

const replace = (config, path, key) => {
  const envValue = getEnvValue(path, key) || getEnvValue(snakeCase(path), snakeCase(key));

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
