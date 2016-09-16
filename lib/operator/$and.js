var _ = require('underscore');
const MAX_VALUES_AND = 20;

module.exports = {
    /**
     * Get a value indicating if the query has valid syntax for the operator
     *
     * @param key {String} The key
     * @param value {Object} The value
     * @param [nestedOperator] {Boolean} If the operator is used as a nested operator
     */
    validate: function (key, value, nestedOperator) {
        if (nestedOperator) {
            throw new Error('Incorrect syntax using $and: Must not be nested');
        }

        if (!_.isArray(value) || value.length < 2) {
            throw new Error('Invalid $and value');
        }

        if (value.length > MAX_VALUES_AND) {
            throw new Error('Exceeded limit of ' + MAX_VALUES_AND + ' for $and');
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
        queryBuilder.buildQueryInternal(value[0]);

        for (var i = 1; i < value.length; i++) {
            queryBuilder.appendRawString(' AND ');
            queryBuilder.buildQueryInternal(value[i]);
        }
    }
};
