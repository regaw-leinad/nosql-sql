var _ = require('underscore');
const MAX_VALUES_IN = 200;

module.exports = {
    /**
     * Get a value indicating if the query has valid syntax for the clause
     *
     * @param key {String} The key
     * @param value {Object} The value
     * @param [nestedClause] {Boolean} If the clause is used as a nested clause
     */
    validate: (key, value, nestedClause) => {
        if (!nestedClause) {
            throw new Error('Incorrect syntax using $in');
        }

        if (!_.isArray(value) || value.length === 0) {
            throw new Error('Invalid $in value: ' + value);
        }

        if (value.length > MAX_VALUES_IN) {
            throw new Error('Exceeded limit of ' + MAX_VALUES_IN + ' for $in');
        }
    },
    /**
     * Handle the building of the clause for the query
     *
     * @param queryBuilder {QueryBuilder}
     * @param parentKey {String} The key associated with the clause
     * @param value {Object} The value
     */
    handle: (queryBuilder, parentKey, value) => {
        queryBuilder.appendKey(parentKey);
        queryBuilder.appendRawString(' IN(');

        queryBuilder.appendData(value[0]);

        for (var i = 1; i < value.length; i++) {
            queryBuilder.appendRawString(', ');
            queryBuilder.appendData(value[i]);
        }

        queryBuilder.appendRawString(')');
    }
};