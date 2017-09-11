# env2Conf

Use JSON file(s), and/or ENV vars to configure your application for different environments (NODE_ENV).
Supports defaults. Supports nested values.

## Installation

```js
$ npm install env2conf
```

## Features

- Use JSON or JS files to configure your application for different NODE_ENV values (production, dev, etc...)

```javascript
// file: config/config.js
{
  my_var_a : "some value"
}
```

```javascript
// file: config/env/production.json
{
  my_var_a : "some value"
}
```



- Overwrite your application's config by using ENV variables and restarting the app. Supports scalar and array values.

```
export MY_VAR_A=someScalarValue
export MY_VAR_B=this,var,is,an,array,of,values
```

- Use .env file for development
```
  MY_VAR_A=someValue
```

## Example

```javascript
// file: config/config.js
// var names should be snakecase (a_var_example) in order to be able to overwrite them correctly using env vars.
module.exports =
{
  var_one: '1_dev_',
  nested_example: {
    var_two: '2_dev_'
}
```

```javascript
// file: config/evn/production.json
{
  "var_one"|: '1_prod',
  "nested_example": {
    "var_two": "2_prod"
  }
}
```

```javascript
// file: app.js
const env2conf = require('../env2conf');
env2conf({ // these are the default values
  configFolder: './config',
  configPath: './config/config.js',
  envFolder = './config/env',
  loadDotEnv=['development']
})

```

```
// file: myFile.js
const config = require('./config/config');
console.log(var_one:', config.var_one);
console.log(var_two:', config.nested_example.varTwo);

// Env vars can overwrite the config values. The app will need a restart to load the new values:
// export VAR_ONE="some other value for var one"
// export NESTED_EXAMPLE_VAR_TWO="some other value for var two"
```


## License

  MIT
