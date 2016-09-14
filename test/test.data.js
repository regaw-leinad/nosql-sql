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
    single: {
        simple: {
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
        },
        implicitAnd: {
            query: {test1: 123, test2: 456},
            result: {
                query: 'SELECT * FROM c WHERE (c.test1 = @v0 AND c.test2 = @v1)',
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
        },
        explicitAnd: {
            query: {$and: [{test1: 123}, {test2: 456}]},
            result: {
                query: 'SELECT * FROM c WHERE (c.test1 = @v0 AND c.test2 = @v1)',
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