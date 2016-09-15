var expect = require('chai').expect;

var buildQuery = require('../index');
var data = require('./test.data');

function expectBuilderEql (data) {
    expect(buildQuery(data.query)).to.eql(data.result);
}

function expectBuilderThrow (data, errorMsg) {
    expect(buildQuery.bind(this, data.query)).to.throw(errorMsg);
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
        });
    });

});
