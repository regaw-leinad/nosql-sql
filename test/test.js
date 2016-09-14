var expect = require('chai').expect;

var buildQuery = require('../lib/queryBuilder');
var data = require('./test.data');

function expectBuilder (data) {
    expect(buildQuery(data.query)).to.eql(data.result);
}

describe('with no arguments', () => {
    it('should return non-scoped query when passed undefined', () => {
        expectBuilder(data.undef);
    });

    it('should return non-scoped query when passed {}', () => {
        expectBuilder(data.empty);
    });
});

describe('with single-level queryFilter', () => {
    it('should handle a simple KV pair', () => {
        expectBuilder(data.single.simple);
    });

    it('should handle a spaces in the key', () => {
        expectBuilder(data.single.space);
    });

    it('should handle implicit $and', () => {
        expectBuilder(data.single.implicitAnd);
    });

    it('should handle explicit $and', () => {
        expectBuilder(data.single.explicitAnd);
    });
});
