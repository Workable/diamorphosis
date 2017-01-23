module.exports =
{
    description: 'should replace string value from env var',
    input: {
        config: {
            development: {
                test: 'a string',
                nested: {
                    nestedtest1: 'one'
                }
            },
            production: {

            }
        },
        nodeEnv: 'development',
        env: {
            test: 'replaced a string'
        }
    },
    expected: {
        config: {
            test: 'replaced a string',
            nested: {
                nestedtest1: 'one'
            }
        }
    }
};


