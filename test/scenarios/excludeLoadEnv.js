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
            defaults: {
                testDefault: 'testDefaultOk'
            },
            production: {

            }
        },
        nodeEnv: 'development',
        options: {
            excludeEnvLoad: ['development']
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
