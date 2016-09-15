var expect = require('chai').expect;

var buildQuery = require('../index');
var data = require('./test.data');

function expectBuilderEql (data) {
    expect(buildQuery(data.query)).to.eql(data.result);
}

function expectBuilderThrow (data, errorMsg) {
    expect(buildQuery.bind(this, data.query || data)).to.throw(errorMsg);
}

describe('#buildQuery()', function () {
    describe('Empty query', function () {
        it('Returns default query when passed undefined', function () {
            expectBuilderEql(data.empty.undef);
        });

        it('Returns default query when passed {}', function () {
            expectBuilderEql(data.empty.empty);
        });
    });

    describe('Simple query', function () {
        it('Handles a single field query', function () {
            expectBuilderEql(data.simple.single);
        });

        it('Handles whitespace in the key', function () {
            expectBuilderEql(data.simple.space);
        });
    });

    describe('Clauses', function () {
        it('Throws on invalid', function () {
            expectBuilderThrow(data.clause.invalid, 'Nested keys must be clause: $notClause');
        });

        describe('$and', function () {
            it('Handles implicit $and', function () {
                expectBuilderEql(data.$and.implicit);
            });

            it('Handles explicit $and', function () {
                expectBuilderEql(data.$and.explicit);
            });

            it('Throws when using $and as nested clause', function () {
                expectBuilderThrow(data.$and.throwNested, 'Incorrect syntax using $and: Must not be nested');
            });

            it('Throws when value is not array', function () {
                expectBuilderThrow(data.$and.throwValue, 'Invalid $and value');
            });
        });

        describe('$between', function () {
            it('Handles simple $between', function () {
                expectBuilderEql(data.$between.simple);
            });

            it('Throws when value is not array length of 2', function () {
                expectBuilderThrow(data.$between.throwValue, 'Value of $between must be an array of length 2');
                expectBuilderThrow(data.$between.throwValueLength, 'Value of $between must be an array of length 2');
            });

            it('Throws when value contains not only strings or numbers', function () {
                expectBuilderThrow(data.$between.throwValueType1, 'Arguments to $between must be either strings or numbers');
                expectBuilderThrow(data.$between.throwValueType2, 'Arguments to $between must be either strings or numbers');
                expectBuilderThrow(data.$between.throwValueType3, 'Arguments to $between must be either strings or numbers');
                expectBuilderThrow(data.$between.throwValueType4, 'Arguments to $between must be either strings or numbers');
            });

            it('Throws when not nested', function () {
                expectBuilderThrow(data.$between.throwNested, 'Incorrect syntax using $between: Must be nested');
            });
        });

        describe('$gt', function () {
            it('Handles single $gt', function () {
                expectBuilderEql(data.$gt.single);
            });

            it('Handles multiple $gt', function () {
                expectBuilderEql(data.$gt.multiple);
            });

            it('Throws when value is not string or number', function () {
                expectBuilderThrow(data.$gt.throwObject, 'Argument to $gt must be either a string or number');
            });

            it('Throws when not nested', function () {
                expectBuilderThrow(data.$gt.throwNested, 'Incorrect syntax using $gt: Must be nested');
            });
        });

        describe('$in', function () {
            it('Handles simple $in', function () {
                expectBuilderEql(data.$in.simple);
            });

            it('Throws when not nested', function () {
                expectBuilderThrow(data.$in.throwNested, 'Incorrect syntax using $in: Must be nested');
            });

            it('Throws when value is not array of length > 0', function () {
                expectBuilderThrow(data.$in.throwValue, 'Value of $in must be an array of length greater than 0');
                expectBuilderThrow(data.$in.throwValueLength, 'Value of $in must be an array of length greater than 0');
            });

            it('Throws when more than 200 values in array', function () {
                // Simulate 201 entries in value array
                var values = [];
                for (var i = 0; i <= 200; i++) {
                    values[i] = i;
                }

                expectBuilderThrow({test: {$in: values}}, 'Exceeded limit of 200 for $in');
            });
        });

        describe('$lt', function () {
            it('Handles single $lt', function () {
                expectBuilderEql(data.$lt.single);
            });

            it('Handles multiple $lt', function () {
                expectBuilderEql(data.$lt.multiple);
            });

            it('Throws when value is not string or number', function () {
                expectBuilderThrow(data.$lt.throwObject, 'Argument to $lt must be either a string or number');
            });

            it('Throws when not nested', function () {
                expectBuilderThrow(data.$lt.throwNested, 'Incorrect syntax using $lt: Must be nested');
            });
        });
    });
});
