var expect = require('chai').expect;

var buildQuery = require('../index');
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

describe('with queryFilter', () => {
    it('should handle a simple single KV pair', () => {
        expectBuilder(data.simple.single);
    });

    it('should handle a spaces in the key', () => {
        expectBuilder(data.simple.space);
    });

    it('should handle implicit $and', () => {
        expectBuilder(data.implicitAnd.simple);
    });
});
