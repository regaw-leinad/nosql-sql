module.exports = {
    undef: {
        query: undefined,
        result: {
            query: 'SELECT * FROM c',
            parameters: []
        }
    },
    empty: {
        query: {},
        result: {
            query: 'SELECT * FROM c',
            parameters: []
        }
    },
    simple: {
        single: {
            query: {test: 123},
            result: {
                query: 'SELECT * FROM c WHERE (c.test = @v0)',
                parameters: [
                    {
                        name: '@v0',
                        value: 123
                    }
                ]
            }
        },
        space: {
            query: {"a space ": 123},
            result: {
                query: 'SELECT * FROM c WHERE (c["a space "] = @v0)',
                parameters: [
                    {
                        name: '@v0',
                        value: 123
                    }
                ]
            }
        }
    },
    implicitAnd: {
        simple: {
            query: {test: 123, test2: 456},
            result: {
                query: 'SELECT * FROM c WHERE (c.test = @v0 AND c.test2 = @v1)',
                parameters: [
                    {
                        name: '@v0',
                        value: 123
                    },
                    {
                        name: '@v1',
                        value: 456
                    }
                ]
            }
        }
    }
};
