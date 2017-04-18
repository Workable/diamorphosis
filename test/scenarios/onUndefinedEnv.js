module.exports =
{
    description: 'should load the defaults',
    input: {
        config: {
            development: {
                test: 1,
                nested: {
                    nestedtest1: 'one'
                }
            },
            defaults: {
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


