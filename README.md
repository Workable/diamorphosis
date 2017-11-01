# diamorphosis

Use
  - JSON file(s)
  - .env file for development
  - ENV vars

to configure your application for different environments (NODE_ENV).
Supports defaults. Supports nested values.

## Installation

```js
$ npm install diamorphosis
```

## Features

- Use JSON or JS files to configure your application for different NODE_ENV values (production, dev, etc...)

```javascript
// file: config/config.js
{
  my_var_a : "some value",
  myVarB: "some value"
}
```

```javascript
// file: config/env/production.json
{
  "nested":{
    "my_var_a" : "some production value",
    "myVarB": "some production value"
  }
}
```

To enable the production configuration set NODE_ENV=production



- Overwrite your application's config by using ENV variables and restarting the app. Supports scalar and array values.

```
export NESTED_MY_VAR_A=someScalarValue
export NESTED_MY_VAR_B=this,var,is,an,array,of,values // NESTED_MYVARB is also supported
export NESTED_BOOLEAN=true
```

- Use .env file for development
```
  NESTED_MY_VAR_A=someValue
```

## Example

```javascript
// file: config/config.js
// var names should be snakecase (a_var_example) in order to be able to overwrite them correctly using env vars.
module.exports =
{
  varOne: '1_dev_',
  nestedExample: {
    varTwo: '2_dev_'
  }
}
```

```javascript
// file: config/evn/production.json
{
  "varOne": '1_prod',
  "nestedExample": {
    "varTwo": "2_prod"
  }
}
```

```javascript
// file: config/evn/other.json
{
  "varOne": '1_other',
  "nestedExample": {
    "varTwo": "2_other"
  }
}
```

```javascript
// file: app.js
const diamorphosis = require('diamorphosis');
diamorphosis({ // these are the default values
  configFolder: './config',
  configPath: './config/config.js',
  envFolder = './config/env',
  loadDotEnv=['development'] // will only load .env if NODE_ENV=development
})

```

```js
// file: myFile.js
const config = require('./config/config');
console.log(var_one:', config.var_one);
console.log(var_two:', config.nested_example.varTwo);

// Env vars can overwrite the config values. The app will need a restart to load the new values:
// export VAR_ONE="some other value for var one"
// export NESTED_EXAMPLE_VAR_TWO="some other value for var two"
```

```md
# file .env

VAR_ONE=value
```

## Supported types

- number
- boolean
- string

## es6 support

Config.js can use the es6 export default eg:

```js
export default {
  varOne: '1_dev_',
  nestedExample: {
    varTwo: '2_dev_'
  }
}
```

This is especially usefull if you are using diamorphosis with typescript.

Note that env files can have .json or .js extension

## License

  MIT
