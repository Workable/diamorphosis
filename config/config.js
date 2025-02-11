module.exports = {
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
    'with.dot': 'with.dot',
    regex: new RegExp('some-regex.*'),
    regexWithFlags: new RegExp('some-regex-with-flags.*', 'gi')
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
      //should be treated as string array
      objectArray: [{}, {}],
      camelCase: 'camelCase',
      'with.dot': 'with.dot',
      regex: new RegExp('some-regex.*'),
      regexWithFlags: new RegExp('some-regex-with-flags.*', 'gi')
    }
  },
  from_env: {
    number: 0.0,
    boolean: false,
    str: 'string',
    array: [1, 2, 3],
    arrayTwo: [],
    numberArray: [1, 2, 3],
    booleanArray: [true, false],
    stringArray: ['a', 'b', 'c'],
    //should be treated as string array
    objectArray: [{}, {}],
    camelCase: 'camelCase',
    nestedCamelCase: {
      nested: 'nestedCamelCase'
    },
    'with.dot': 'with.dot',
    regex: new RegExp('some-regex.*'),
    regexWithFlags: new RegExp('some-regex-with-flags.*', 'gi')
  },
  from_test_json: {
    number: 0.0,
    boolean: true,
    str: 'string',
    array: [1, 2, 3],
    numberArray: [1, 2, 3],
    booleanArray: [true, false],
    stringArray: ['a', 'b', 'c'],
    //should be treated as string array
    objectArray: [{}, {}],
    camelCase: 'camelCase',
    null: null,
    'with.dot': 'with.dot',
    regex: new RegExp('some-regex.*'),
    regexWithFlags: new RegExp('some-regex-with-flags.*', 'gi')
  }
};
