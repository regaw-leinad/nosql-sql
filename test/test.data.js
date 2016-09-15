module.exports = {
    empty: {
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
        }
    },
    simple: {
        single: {
            query: {test: 123},
            result: {
                query: 'SELECT * FROM c WHERE c.test = @v0',
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
                query: 'SELECT * FROM c WHERE c["a space "] = @v0',
                parameters: [
                    {
                        name: '@v0',
                        value: 123
                    }
                ]
            }
        }
    },
    clause: {
        invalid: {
            query: {test: {$notClause: 1}}
        }
    },
    $and: {
        implicit: {
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
        explicit: {
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
        },
        throwNested: {
            query: {test: {$and: [{t: 1}, {t: 2}]}}
        },
        throwValue: {
            query: {$and: {nope: 'nope'}}
        }
    },
    $gt: {
        single: {
            query: {test: {$gt: 6}},
            result: {
                query: 'SELECT * FROM c WHERE (c.test > @v0)',
                parameters: [
                    {
                        name: '@v0',
                        value: 6
                    }
                ]
            }
        },
        multiple: {
            query: {test: {$gt: 6}, test2: {$gt: 1}},
            result: {
                query: 'SELECT * FROM c WHERE ((c.test > @v0) AND (c.test2 > @v1))',
                parameters: [
                    {
                        name: '@v0',
                        value: 6
                    },
                    {
                        name: '@v1',
                        value: 1
                    }
                ]
            }
        },
        throwObject: {
            query: {test: {$gt: {will: 'throw'}}}
        },
        throwNested: {
            query: {$gt: {test: 6}}
        }
    },
    $in: {
        simple: {
            query: {test: {$in: [1, 2]}},
            result: {
                query: 'SELECT * FROM c WHERE (c.test IN(@v0, @v1))',
                parameters: [
                    {
                        name: '@v0',
                        value: 1
                    },
                    {
                        name: '@v1',
                        value: 2
                    }
                ]
            }
        }
    },
    $between: {
        simple: {
            query: {test: {$between: [1, 5]}},
            result: {
                query: 'SELECT * FROM c WHERE (c.test BETWEEN @v0 AND @v1)',
                parameters: [
                    {
                        name: '@v0',
                        value: 1
                    },
                    {
                        name: '@v1',
                        value: 5
                    }
                ]
            }
        }
    }
};
