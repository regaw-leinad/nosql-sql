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
        },
        throwValue: {
            query: {test: {$between: 'nope'}}
        },
        throwValueLength: {
            query: {test: {$between: ['nope', 'nope', 'nope']}}
        },
        throwValueType1: {
            query: {test: {$between: [{nope: 'nope'}, 3]}}
        },
        throwValueType2: {
            query: {test: {$between: [1, {nope: 'nope'}]}}
        },
        throwValueType3: {
            query: {test: {$between: [{nope: 'nope'}, {nope: 'nope'}]}}
        },
        throwValueType4: {
            query: {test: {$between: [[], {}]}}
        },
        throwNested: {
            query: {$between: {test: [1, 2]}}
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
    $gte: {
        single: {
            query: {test: {$gte: 6}},
            result: {
                query: 'SELECT * FROM c WHERE (c.test >= @v0)',
                parameters: [
                    {
                        name: '@v0',
                        value: 6
                    }
                ]
            }
        },
        multiple: {
            query: {test: {$gte: 6}, test2: {$gte: 1}},
            result: {
                query: 'SELECT * FROM c WHERE ((c.test >= @v0) AND (c.test2 >= @v1))',
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
            query: {test: {$gte: {will: 'throw'}}}
        },
        throwNested: {
            query: {$gte: {test: 6}}
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
        },
        throwNested: {
            query: {$in: {test: [1, 2]}}
        },
        throwValue: {
            query: {test: {$in: 'nope'}}
        },
        throwValueLength: {
            query: {test: {$in: []}}
        }
    },
    $lt: {
        single: {
            query: {test: {$lt: 6}},
            result: {
                query: 'SELECT * FROM c WHERE (c.test < @v0)',
                parameters: [
                    {
                        name: '@v0',
                        value: 6
                    }
                ]
            }
        },
        multiple: {
            query: {test: {$lt: 6}, test2: {$lt: 1}},
            result: {
                query: 'SELECT * FROM c WHERE ((c.test < @v0) AND (c.test2 < @v1))',
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
            query: {test: {$lt: {will: 'throw'}}}
        },
        throwNested: {
            query: {$lt: {test: 6}}
        }
    }
};
