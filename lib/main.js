const deepExtend = require('deep-extend');
const dotenv = require('dotenv');
const path = require('path');
const { replaceConfigFromEnv, requireFileSafe } = require('./helpers');

function updateConfig(
  {
    configFolder = path.resolve('config'),
    configPath = path.resolve(`${configFolder}/config.js`),
    envFolder = path.resolve(`${configFolder}/env`),
    loadDotEnv = ['development']
  } = {}
) {
  const env = process.env.NODE_ENV || 'development';
  if (loadDotEnv.indexOf(env) !== -1) {
    dotenv.load();
  }
  const config = requireFileSafe(configPath) || {};

  const envConfig =
    requireFileSafe(`${envFolder}/${env.toLowerCase()}.json`, false) ||
    requireFileSafe(`${envFolder}/${env.toLowerCase()}.js`);
  deepExtend(config, envConfig);
  replaceConfigFromEnv(config);
}

module.exports = updateConfig;
