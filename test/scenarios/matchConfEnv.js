module.exports =
{
    description: 'should match the env key to the config key',
    input: {
        config: {
            development: {
                test: 1,
                nested: {
                    nestedtest1: 'one'
                }
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
            }
        }
    }
};


