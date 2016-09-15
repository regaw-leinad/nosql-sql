var expect = require('chai').expect;

var buildQuery = require('../lib/queryBuilder');
var data = require('./test.data');

function expectBuilderEql (data) {
    expect(buildQuery(data.query)).to.eql(data.result);
}

function expectBuilderThrow (data, errorMsg) {
    expect(buildQuery.bind(this, data.query)).to.throw(errorMsg);
}

describe('with no arguments', () => {
    it('should return non-scoped query when passed undefined', () => {
        expectBuilderEql(data.undef);
    });

    it('should return non-scoped query when passed {}', () => {
        expectBuilderEql(data.empty);
    });
});

describe('with single-level queryFilter', () => {
    it('should handle a simple KV pair', () => {
        expectBuilderEql(data.single.simple);
    });

    it('should handle a spaces in the key', () => {
        expectBuilderEql(data.single.space);
    });

    it('should handle implicit $and', () => {
        expectBuilderEql(data.single.implicitAnd);
    });

    it('should handle explicit $and', () => {
        expectBuilderEql(data.single.explicitAnd);
    });

    it('should throw immediately-nested $and', () => {
        expectBuilderThrow(data.single.explicitAndThrow, 'Incorrect syntax using nested $and')
    });

    it('should handle $in', () => {
        expectBuilderEql(data.single.inClause);
    });

    it('should handle $between', () => {
        expectBuilderEql(data.single.between);
    });
});

describe('with a nested queryFilter', () => {
    it('should throw on an invalid nested clause', () => {
        expectBuilderThrow(data.nested.invalid, 'Nested keys must be clause: $notClause');
    });
});
