module.exports = {
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
    number: 0.0,
    boolean: false,
    str: 'string',
    array: [1, 2, 3],
    arrayTwo: [],
    camelCase: 'camelCase',
    nestedCamelCase: {
      nested: 'nestedCamelCase'
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
};
