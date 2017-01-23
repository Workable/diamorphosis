module.exports =
{
    description: 'should replace boolean value from env var',
    input: {
        config: {
            development: {
                test: 1,
                nested: {
                    nestedtest1: false
                }
            },
            production: {

            }
        },
        nodeEnv: 'development',
        env: {
            nested_nestedtest1: true
        }
    },
    expected: {
        config: {
            test: 1,
            nested: {
                nestedtest1: true
            }
        }
    }
};


