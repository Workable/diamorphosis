const deepExtend = require('deep-extend');
const dotenv = require('dotenv');
const path = require('path');
const { replaceConfigFromEnv, requireFileSafe } = require('./helpers');

function updateConfig(
  {
    configFolder = path.resolve(process.cwd(), 'config'),
    configPath = `${configFolder}/config.js`,
    envFolder = `${configFolder}/env`,
    loadDotEnv = ['development']
  } = {}
) {
  const env = process.env.NODE_ENV || '';
  if (loadDotEnv.indexOf(env) !== -1) {
    dotenv.load();
  }
  const config = requireFileSafe(configPath) || {};

  const envConfig =
    requireFileSafe(`${envFolder}/${env.toLowerCase()}.json`) ||
    requireFileSafe(`${envFolder}/${env.toLowerCase()}.js`);
  deepExtend(config, envConfig);
  replaceConfigFromEnv(config);
}

module.exports = updateConfig;
