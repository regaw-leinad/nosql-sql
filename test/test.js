var expect = require('chai').expect;

var buildQuery = require('../lib/queryBuilder');
var data = require('./test.data');

function expectBuilderEql (data) {
    expect(buildQuery(data.query)).to.eql(data.result);
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
});
