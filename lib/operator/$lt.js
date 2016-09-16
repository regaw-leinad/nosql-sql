var _ = require('underscore');

module.exports = {
    /**
     * Get a value indicating if the query has valid syntax for the operator
     *
     * @param key {String} The key
     * @param value {Object} The value
     * @param [nestedOperator] {Boolean} If the operator is used as a nested operator
     */
    validate: function (key, value, nestedOperator) {
        if (!nestedOperator) {
            throw new Error('Incorrect syntax using $lt: Must be nested');
        }

        if (!_.isString(value) && !_.isNumber(value)) {
            throw new Error('Argument to $lt must be either a string or number');
        }
    },
    /**
     * Handle the operator translation
     *
     * @param queryBuilder {QueryBuilder}
     * @param parentKey {String} The key associated with the operator
     * @param value {Object} The value
     */
    handle: function (queryBuilder, parentKey, value) {
        queryBuilder.appendKey(parentKey);
        queryBuilder.appendRawString(' < ');
        queryBuilder.appendValue(value);
    }
};
