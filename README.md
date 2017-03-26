# env2Conf

Use JSON file(s), and/or ENV vars to configure your application for different environments (NODE_ENV).
Supports defaults. Supports nested values.

## Installation

```js
$ npm install env2conf
```

## Features 

- Use a JSON file to configure your application for different NODE_ENV values (production, dev, etc...)

```
{
    development: {
        my_var_a : "some value"
    },
    production: {
        my_var_a : "some value"
    }
}
```

For seperate files per env:
```
{
    development: require('./development')
    production: require('./production')
}
```

- Support for default values

```
{
    default: {
        my_var_a : "some value",
        my_var_b: "some value"
    },
    development: {
        my_var_a : "some value"
    },
    production: {
        my_var_a : "some value"
    }
}
```

- Overwrite your application's config by using ENV variables and restarting the app. Supports scalar and array values.

```
export MY_VAR_A=someScalarValue
export MY_VAR_B=this,var,is,an,array,of,values
```

## Example

```
// file: configValues.js
// var names should be snakecase (a_var_example) in order to be able to overwrite them correctly using env vars.
module.exports = 
{
    development: {
        var_one: '1_dev_',
        nested_example: {
            var_two: '2_dev_'
        }
    },
    production: {
        var_one: '1_prod',
        nested_example: {
            var_two: '2_prod'
        }
    }
 },
```

```
// file: config.js
const Env2conf = require('../env2conf');
const configValues = require('./configValues.js')
const env2conf = new Env2conf({config: configValues});
module.exports = env2conf.getConfig();
```

```
// file: myFile.js
const config = require('./config');
console.log(var_one:', config.var_one);
console.log(var_two:', config.nested_example.varTwo);

// Env vars can overwrite the config values. The app will need a restart to load the new values:
// export VAR_ONE="some other value for var one"
// export NESTED_EXAMPLE_VAR_TWO="some other value for var two"
```


## License

  MIT
