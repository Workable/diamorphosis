module.exports =
{
    description: 'should get cached config if called more than one times',
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
        rerun: true
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


