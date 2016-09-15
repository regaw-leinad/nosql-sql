var expect = require('chai').expect;

var buildQuery = require('../index');
var data = require('./test.data');

function expectBuilderEql (data) {
    expect(buildQuery(data.query)).to.eql(data.result);
}

function expectBuilderThrow (data, errorMsg) {
    expect(buildQuery.bind(this, data.query)).to.throw(errorMsg);
}

describe('with no arguments', function () {
    it('should return non-scoped query when passed undefined', function () {
        expectBuilderEql(data.undef);
    });

    it('should return non-scoped query when passed {}', function () {
        expectBuilderEql(data.empty);
    });
});

describe('with single-level queryFilter', function () {
    it('should handle a simple KV pair', function () {
        expectBuilderEql(data.single.simple);
    });

    it('should handle a spaces in the key', function () {
        expectBuilderEql(data.single.space);
    });

    it('should handle implicit $and', function () {
        expectBuilderEql(data.single.implicitAnd);
    });

    it('should handle explicit $and', function () {
        expectBuilderEql(data.single.explicitAnd);
    });

    it('should throw immediately-nested $and', function () {
        expectBuilderThrow(data.single.explicitAndThrow, 'Incorrect syntax using nested $and')
    });

    it('should handle $in', function () {
        expectBuilderEql(data.single.inClause);
    });

    it('should handle $between', function () {
        expectBuilderEql(data.single.between);
    });
});

describe('with a nested queryFilter', function () {
    it('should throw on an invalid nested clause', function () {
        expectBuilderThrow(data.nested.invalid, 'Nested keys must be clause: $notClause');
    });
});
