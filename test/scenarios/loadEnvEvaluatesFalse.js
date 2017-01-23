module.exports =
{
    description: 'should exclude loading the env if the excludeLoadEnv callback evaluates to true',
        input: {
    config: {
        development: {
            test: 1,
                nested: {
                nestedtest1: 'one'
            }
        },
    default: {
            testDefault: 'testDefaultOk'
        },
        production: {

        }
    },
    nodeEnv: 'development',
        options: {
        excludeEnvLoad: () => false
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
