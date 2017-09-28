module.exports = {
  description: 'should replace values from env, test.json',
  NODE_ENV: 'test',
  input: [],
  env: {
    FROM_ENV_NUMBER: 2.0,
    FROM_ENV_BOOLEAN: true,
    FROM_ENV_STR: 'string',
    FROM_ENV_ARRAY: ['g', 'h', 'i'],
    FROM_ENV_CAMEL_CASE: 'snake_case'
  },
  expected: {
    nested: {
      number: 1.3,
      boolean: true,
      str: 'string',
      array: [1, 2, 3],
      camelCase: 'camelCase'
    },
    from: {
      dot_env: {
        number: 0.0,
        boolean: false,
        str: 'string',
        array: [1, 2, 3],
        camelCase: 'camelCase'
      }
    },
    from_env: {
      number: 2.0,
      boolean: true,
      str: 'string',
      array: ['g', 'h', 'i'],
      camelCase: 'snake_case'
    },
    from_test_json: {
      number: 1000.0,
      boolean: false,
      str: 'test',
      array: ['a', 'b', 'c'],
      camelCase: 'test'
    }
  }
};
