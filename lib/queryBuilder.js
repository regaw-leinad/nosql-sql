var clauses = require('./clause/clauses');
var _ = require('underscore');

function QueryBuilder (queryFilter) {
    this.result = {
        query: 'SELECT * FROM c',
        parameters: []
    };

    this.queryFilter = queryFilter;
}

/**
 * Build and get the query object
 *
 * @return {DocDBQuery}
 */
QueryBuilder.prototype.build = function () {
    if (_.size(this.queryFilter) > 0) {
        this.result.query += ' WHERE ';
        this.buildQueryInternal(this.queryFilter);
    }

    return this.result;
};

/**
 * Recursive helper function for @buildQuery()
 *
 * @param queryFilter {Object} The query object at the current level
 */
QueryBuilder.prototype.buildQueryInternal = function (queryFilter) {
    var keys = _.keys(queryFilter);

    if (keys.length < 1) {
        throw new Error('Invalid object: ' + queryFilter);
    }

    if (keys.length > 20) {
        throw new Error('Exceeded limit of 20 for $and');
    }

    var implicitAnd = keys.length > 1;

    // Parenthesis group for implicit $and
    if (implicitAnd) {
        this.appendRawString('(');
    }

    var key = keys[0];
    var value = queryFilter[key];
    this.processKVPair(key, value);

    // Handle other keys in implicit $and
    for (var i = 1; i < keys.length; i++) {
        this.appendRawString(' AND ');

        key = keys[i];
        value = queryFilter[key];
        this.processKVPair(key, value);
    }

    // End implicit $and group
    if (implicitAnd) {
        this.appendRawString(')');
    }
};
/**
 * Processes a key value pair in the query
 *
 * @param key {String} The key
 * @param value {Object} The value
 */
QueryBuilder.prototype.processKVPair = function (key, value) {
    if (_.isUndefined(value)) {
        throw new Error('Invalid key: ' + key);
    }

    var clause = clauses[key];

    if (!_.isUndefined(clause)) {
        return this.executeClause(clause, key, value);
    }

    if (key.startsWith('$')) {
        console.warn('Looks like a clause, but is not supported:', key);
    }

    if (isSimpleDataType(value)) {
        return this.appendKVPair(key, value);
    }

    // If we get here, that means we had a nested clause
    // The only values that can be immediately nested are clauses
    // Ex: {test: {$gt: 5}}
    if (_.isObject(value)) {
        var nestedKeys = _.keys(value);

        if (nestedKeys.size < 1) {
            throw new Error('Invalid key/value: ' + key);
        }

        if (nestedKeys.length > 20) {
            throw new Error('Exceeded limit of 20 for $and');
        }

        var implicitAnd = nestedKeys.length > 1;

        // Parenthesis group for implicit $and
        if (implicitAnd) {
            this.appendRawString('(');
        }

        var nestedKey = nestedKeys[0];
        var nestedValue = value[nestedKey];

        var nestedClause = clauses[nestedKey];
        if (_.isUndefined(nestedClause)) {
            throw new Error('Nested keys must be clause: ' + nestedKey);
        }

        this.executeClause(nestedClause, key, nestedValue, true);

        for (var i = 1; i < nestedKeys.length; i++) {
            this.appendRawString(' AND ');

            nestedKey = nestedKeys[i];
            nestedValue = value[nestedKey];

            nestedClause = clauses[nestedKey];
            if (_.isUndefined(nestedClause)) {
                throw new Error('Nested keys must be clause: ' + nestedKey);
            }

            this.executeClause(nestedClause, key, nestedValue, true);
        }

        // Parenthesis group for implicit $and
        if (implicitAnd) {
            this.appendRawString(')');
        }

        return;
    }

    throw new Error('Invalid value for key: ' + key);
};

/**
 * Append a raw string to the result query string
 *
 * @param str {String} The raw string to append
 */
QueryBuilder.prototype.appendRawString = function (str) {
    this.result.query += str;
};

/**
 * Append a key/value pair to the result query
 *
 * @param key {String} The key
 * @param value {Object} The value
 */
QueryBuilder.prototype.appendKVPair = function (key, value) {
    this.appendKey(key);
    this.appendRawString(' = ');
    this.appendValue(value);
};

/**
 * Append a key to the result query
 *
 * @param key {String} The key
 */
QueryBuilder.prototype.appendKey = function (key) {
    // If the key has whitespace, access property differently
    this.appendRawString(/\s/.test(key) ? 'c["' + key + '"]' : 'c.' + key);
};

/**
 * Append a parametrized value to the result query
 *
 * @param value {Object} The value
 */
QueryBuilder.prototype.appendValue = function (value) {
    var v = '@v' + this.result.parameters.length;

    this.result.query += v;
    this.result.parameters.push({
        name: v,
        value: value
    });
};

/**
 * Executes a query building clause
 *
 * @param clause {Object} The clause object
 * @param parentKey {String} The parent key
 * @param value {Object} The value
 * @param [nestedClause] {Boolean} If the clause is used as an nested clause
 */
QueryBuilder.prototype.executeClause = function (clause, parentKey, value, nestedClause) {
    clause.validate(parentKey, value, nestedClause);

    this.appendRawString('(');
    clause.handle(this, parentKey, value);
    this.appendRawString(')');
};

/**
 * Gets a value indicating if the value is a simple data type
 * Either a String, Number, or Boolean
 *
 * @param value The value to check
 */
var isSimpleDataType = function (value) {
    return _.isString(value) || _.isNumber(value) || _.isBoolean(value);
};

/**
 * @typedef {Object} DocDBQuery
 * @property {String} query The parametrized query string
 * @property {Array} parameters The values to map to the query string
 */

/**
 * @typedef {Object} QueryBuilder
 */

module.exports = QueryBuilder;
