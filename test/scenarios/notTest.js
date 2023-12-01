module.exports = {
  description: 'should replace values from env, .env',
  NODE_ENV: 'other',
  input: [{ loadDotEnv: ['other'] }],
  env: {
    FROM_ENV_NUMBER: 2.0,
    FROM_ENV_BOOLEAN: true,
    FROM_ENV_STR: 'string',
    FROM_ENV_ARRAY: 'g,h,i',
    FROM_ENV_NUMBER_ARRAY: '4,5,6',
    FROM_ENV_BOOLEAN_ARRAY: 'false,true,false',
    FROM_ENV_STRING_ARRAY: 'c,d,e',
    FROM_ENV_OBJECT_ARRAY: 'c,d,e',
    FROM_ENV_CAMELCASE: 'snake_case',
    FROM_ENV_NESTEDCAMELCASE_NESTED: 'nested snake case',
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
      //should be treated as string array
      objectArray: [{}, {}],
      camelCase: 'camelCase',
      'with.dot': 'with.dot'
    },
    from: {
      dot_env: {
        number: 1.0,
        boolean: true,
        str: 'FROM_DOT_ENV_STR',
        array: ['d', 'e', 'f'],
        numberArray: [4, 5, 6],
        booleanArray: [false, true, false],
        stringArray: ['a', 'b', 'c'],
        objectArray: ['o', 'b', 'j', 'e', 'c', 't'],
        camelCase: 'snake_case',
        'with.dot': 'WITH_DOT_ENV'
      }
    },
    from_env: {
      number: 2.0,
      boolean: true,
      str: 'string',
      array: ['g', 'h', 'i'],
      arrayTwo: [],
      numberArray: [4, 5, 6],
      booleanArray: [false, true, false],
      stringArray: ['c', 'd', 'e'],
      objectArray: ['c', 'd', 'e'],
      camelCase: 'snake_case',
      nestedCamelCase: {
        nested: 'nested snake case'
      },
      'with.dot': 'WITH_DOT'
    },
    from_test_json: {
      number: 0.0,
      boolean: true,
      str: 'string',
      array: [1, 2, 3],
      numberArray: [1, 2, 3],
      booleanArray: [true, false],
      stringArray: ['a', 'b', 'c'],
      objectArray: [{}, {}],
      camelCase: 'camelCase',
      null: null,
      'with.dot': 'with.dot'
    }
  }
};
