module.exports =
{
    description: 'should include the default vars to the config object',
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
        nodeEnv: 'development'
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


