module.exports =
{
    description: 'should throw on undefined env',
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
        }
    },
    expected: {
        error: {
            msg: 'env var NODE_ENV is not defined'
        }
    }
};


