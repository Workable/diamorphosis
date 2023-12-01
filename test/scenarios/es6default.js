const path = require('path');

module.exports = {
  description: 'should handle es6 default export',
  NODE_ENV: 'test',
  input: [{ configPath: path.resolve(process.cwd(), './config/config.default.js') }],
  env: {
    FROM_ENV_NUMBER: 2.0,
    FROM_ENV_BOOLEAN: true,
    FROM_ENV_STR: 'string',
    FROM_ENV_ARRAY: 'g,h,i',
    FROM_ENV_NUMBER_ARRAY: '4,5,6',
    FROM_ENV_BOOLEAN_ARRAY: 'false,true,false',
    FROM_ENV_STRING_ARRAY: 'c,d,e',
    FROM_ENV_OBJECT_ARRAY: 'c,d,e',
    FROM_ENV_CAMEL_CASE: 'snake_case',
    FROM_ENV_WITH_DOT: 'WITH_DOT'
  },
  expected: {
    nested: {
      number: 1.3,
      boolean: true,
      str: 'string',
      array: [1, 2, 3],
      numberArray: [1, 2, 3],
      booleanArray: [true, false],
      stringArray: ['a', 'b', 'c'],
      objectArray: [{}, {}],
      camelCase: 'camelCase',
      'with.dot': 'with.dot'
    },
    from: {
      dot_env: {
        number: 0.0,
        boolean: false,
        str: 'string',
        array: [1, 2, 3],
        numberArray: [1, 2, 3],
        booleanArray: [true, false],
        stringArray: ['a', 'b', 'c'],
        objectArray: [{}, {}],
        camelCase: 'camelCase',
        'with.dot': 'with.dot'
      }
    },
    from_env: {
      number: 2.0,
      boolean: true,
      str: 'string',
      array: ['g', 'h', 'i'],
      camelCase: 'snake_case',
      arrayTwo: [],
      numberArray: [4, 5, 6],
      booleanArray: [false, true, false],
      stringArray: ['c', 'd', 'e'],
      objectArray: ['c', 'd', 'e'],
      nestedCamelCase: {
        nested: 'nestedCamelCase'
      },
      'with.dot': 'WITH_DOT'
    },
    from_test_json: {
      number: 1000.0,
      boolean: false,
      str: 'test',
      array: ['a', 'b', 'c'],
      numberArray: [3, 4, 5],
      booleanArray: [false, true, false],
      stringArray: ['d', 'e', 'f'],
      objectArray: ['1'],
      camelCase: 'test',
      null: 'null',
      'with.dot': 'from_test_json'
    }
  }
};
