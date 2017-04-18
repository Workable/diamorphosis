module.exports =
{
    description: 'should use aliases',
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
            TEST_B: 'test-b-ok',
            TEST_C: 'test-c-ok'
        },
        nodeEnv: 'development'
    },
    expected: {
        config: {
            test: 'test-b-ok',
            nested: {
                nestedtest1: 'one'
            },
            testDefault: 'testDefaultOk'
        }
    }
};


