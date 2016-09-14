var _ = require('underscore');
var path = require('path');
var fs = require('fs');

// The commands executed with keywords
var commands = {};

var commandPath = path.join(__dirname, 'command');
var commandFiles = fs.readdirSync(commandPath);

// Register all of the commands
_.each(commandFiles, function (file) {
    var name = path.parse(file).name;

    if (!name.startsWith('$')) {
        return;
    }

    commands[name] = require(path.join(commandPath, file));
});

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
        throw new Error('Empty object');
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

    var command = commands[key];
    if (!_.isUndefined(command)) {
        command.validate(key, value);
        return command.handle(key, value, this);
    }

    if (isSimpleDataType(value)) {
        return this.appendKVPair(key, value);
    }

    if (_.isObject(value)) {
    }
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
    // If the key has whitespace, access property differently
    this.appendRawString(/\s/.test(key) ? 'c["' + key + '"] = ' : 'c.' + key + ' = ');
    this.appendValue(value);
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
 * Gets a value indicating if the value is a simple data type
 * Either a String, Number, or Boolean
 *
 * @param value The value to check
 */
var isSimpleDataType = function (value) {
    return _.isString(value) || _.isNumber(value) || _.isBoolean(value);
};

/**
 * Builds a DocumentDB query object from MongoDB-style syntax
 *
 * @param queryFilter {Object} The MongoDB-style object to build query from
 * @return {DocDBQuery} The DocumentDB query object
 */
var buildQuery = function (queryFilter) {
    return new QueryBuilder(queryFilter).build();
};

/**
 * @typedef {Object} DocDBQuery
 * @property {String} query The parametrized query string
 * @property {Array} parameters The values to map to the query string
 */

/**
 * @typedef {Object} QueryBuilder
 */

module.exports = buildQuery;
