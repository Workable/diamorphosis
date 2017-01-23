module.exports =
{
    description: 'should replace array value from env var',
    input: {
        config: {
            development: {
                test: 1,
                nested: {
                    nestedtest1: ['1', '2', '3']
                }
            },
            production: {

            }
        },
        nodeEnv: 'development',
        env: {
            nested_nestedtest1: '1,2,3,4'
        }
    },
    expected: {
        config: {
            test: 1,
            nested: {
                nestedtest1: ['1', '2', '3', '4']
            }
        }
    },
    only: true
};


