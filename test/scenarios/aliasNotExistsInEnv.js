module.exports =
{
    description: 'should not process alias if it does not exist in the env',
    input: {
        config: {
            development: {
                test: 'test-ok',
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
        options: {
            aliases: {
                TEST_B: ['test']
            }
        },
        env: {
            TEST: 'test-ok',
            TEST_C: 'test-c-ok'
        },
        nodeEnv: 'development'
    },
    expected: {
        config: {
            test: 'test-ok',
            nested: {
                nestedtest1: 'one'
            },
            testDefault: 'testDefaultOk'
        }
    }
};


