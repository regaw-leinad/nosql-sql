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
            throw new Error('Incorrect syntax using $between: Must be nested');
        }

        if (!_.isArray(value) || value.length !== 2) {
            throw new Error('Value of $between must be an array of length 2');
        }

        function isValidValue (val) {
            return _.isNumber(val) || _.isString(val);
        }

        if (!isValidValue(value[0]) || !isValidValue(value[1])) {
            throw new Error('Arguments to $between must be either strings or numbers');
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

        queryBuilder.appendRawString(' BETWEEN ');

        queryBuilder.appendValue(value[0]);
        queryBuilder.appendRawString(' AND ');
        queryBuilder.appendValue(value[1]);
    }
};
