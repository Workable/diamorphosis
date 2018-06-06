module.exports = {
  description: 'should replace values from env, .env',
  NODE_ENV: 'other',
  input: [{ loadDotEnv: ['other'] }],
  env: {
    FROM_ENV_NUMBER: 2.0,
    FROM_ENV_BOOLEAN: true,
    FROM_ENV_STR: 'string',
    FROM_ENV_ARRAY: ['g', 'h', 'i'],
    FROM_ENV_CAMELCASE: 'snake_case',
    FROM_ENV_NESTEDCAMELCASE_NESTED: 'nested snake case'
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
        number: 1.0,
        boolean: true,
        str: 'FROM_DOT_ENV_STR',
        array: ['d', 'e', 'f'],
        camelCase: 'snake_case'
      }
    },
    from_env: {
      number: 2.0,
      boolean: true,
      str: 'string',
      array: ['g', 'h', 'i'],
      camelCase: 'snake_case',
      nestedCamelCase: {
        nested: 'nested snake case'
      }
    },
    from_test_json: {
      number: 0.0,
      boolean: true,
      str: 'string',
      array: [1, 2, 3],
      camelCase: 'camelCase',
      null: null
    }
  }
};
