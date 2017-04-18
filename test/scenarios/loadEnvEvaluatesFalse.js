module.exports =
{
    description: 'should exclude loading the env if the excludeLoadEnv is null',
        input: {
    config: {
        development: {
            test: 1,
                nested: {
                nestedtest1: 'one'
            }
        },
    defaults: {
            testDefault: 'testDefaultOk'
        },
        production: {

        }
    },
    nodeEnv: 'development',
        options: {
        excludeEnvLoad: null
    }
},
    expected: {
        config: {
            test: 1,
                nested: {
                nestedtest1: 'one'
            },
            testDefault: 'testDefaultOk'
        }
    }
};
