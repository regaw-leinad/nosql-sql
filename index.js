var _ = require('underscore');

/**
 * Recursive helper function for @buildQuery()
 *
 * @param queryFilter {Object} The query object at the current level
 * @param result {Object} The query result
 */
var buildQueryInternal = (queryFilter, result) => {
    var keys = _.keys(queryFilter);

    if (keys.length < 1) {
        throw new Error('Empty object');
    }

    // Parenthesis group for implicit $and
    appendRawString('(', result);

    var key = keys[0];
    var value = queryFilter[key];
    processKVPair(key, value, result);

    // Handle other keys in implicit $and
    for (var i = 1; i < keys.length; i++) {
        appendRawString(' AND ', result);

        key = keys[i];
        value = queryFilter[key];
        processKVPair(key, value, result);
    }

    // End implicit $and group
    appendRawString(')', result);
};

/**
 * Processes a key value pair in the query
 *
 * @param key {String} The key
 * @param value
 * @param result
 */
var processKVPair = (key, value, result) => {
    if (_.isUndefined(value)) {
        throw new Error('Invalid key: ' + key);
    }

    // Handle commands here

    if (isSimple(value)) {
        return appendKVPair(key, value, result);
    }

    if (_.isObject(value)) {
    }
};

/**
 * Append a raw string to the result query string
 *
 * @param str {String} The raw string to append
 * @param result {Object} The query result object
 */
var appendRawString = (str, result) => {
    result.query += str;
};

/**
 * Append a key/value pair to the result query
 *
 * @param key {String} The key
 * @param value {String|Number|Boolean} The value
 * @param result {Object} The query result object
 */
var appendKVPair = (key, value, result) => {
    // If the key has whitespace, access property differently
    appendRawString(/\s/.test(key) ? 'c["' + key + '"] = ' : 'c.' + key + ' = ', result);
    appendValue(value, result);
};

/**
 * Append a parametrized value to the result query
 *
 * @param value {String|Number|Boolean} The value
 * @param result {Object} The query result object
 */
var appendValue = (value, result) => {
    var v = '@v' + result.parameters.length;

    result.query += v;
    result.parameters.push({
        name: v,
        value: value
    });
};

/**
 * Gets a value indicating if the value is a simple data type
 * Either a String, Number, or Boolean
 *
 * @param value The value to check
 */
var isSimple = (value) => {
    return _.isString(value) || _.isNumber(value) || _.isBoolean(value);
};

/**
 * Builds a DocumentDB query object from MongoDB-style syntax
 *
 * @param queryFilter {Object} The MongoDB-style object to build query from
 * @return {DocDBQuery} The DocumentDB query object
 */
var buildQuery = (queryFilter) => {
    var result = {
        query: 'SELECT * FROM c',
        parameters: []
    };

    if (_.isUndefined(queryFilter)) {
        return result;
    }

    var keys = Object.keys(queryFilter);

    if (keys.length > 0) {
        result.query += ' WHERE ';
        buildQueryInternal(queryFilter, result);
    }

    return result;
};

/**
 * @typedef {Object} DocDBQuery
 * @property {String} query The parametrized query string
 * @property {Array} parameters The values to map to the query string
 */
module.exports = buildQuery;
