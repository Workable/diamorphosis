module.exports =
{
    description: 'should replace number value from env var',
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
        nodeEnv: 'development',
        env: {
            test: 2
        }
    },
    expected: {
        config: {
            test: 2,
            nested: {
                nestedtest1: 'one'
            }
        }
    }
};


