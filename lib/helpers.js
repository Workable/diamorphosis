const envPathDelimiter = '_';
const arrayStringDelimiter = ',';

const isNullOrUndefined = val => val === null || typeof val === 'undefined';
const getEnvValue = (path, key) => process.env[`${path}${key}`.toUpperCase()];

const isObject = val => val && Object === val.constructor;

const castValue = (value, type) => {
  switch (type) {
    case 'number':
      return Number(value);
    case 'boolean':
      return value === 'true';
    case 'string':
      return value;
  }
  return value.split(arrayStringDelimiter);
};

function snakeCase(str) {
  return str.replace(/(\w)([A-Z]+)/g, (_, w, W) => `${w}_${W.toLowerCase()}`);
}

const replace = (config, path, key) => {
  const envValue = getEnvValue(path, key) || getEnvValue(path, snakeCase(key));

  if (isNullOrUndefined(envValue)) {
    return;
  }

  config[key] = castValue(envValue, typeof config[key]);
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

function requireFileSafe(file) {
  try {
    return require(file);
  } catch (e) {
    console.info(`No ${file} was found.`);
  }
}

module.exports = {
  replaceConfigFromEnv,
  requireFileSafe
};
