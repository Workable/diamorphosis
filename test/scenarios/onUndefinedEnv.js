module.exports =
{
    description: 'should load the default',
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
        config: {
            testDefault: 'testDefaultOk'
        }
    }
};


