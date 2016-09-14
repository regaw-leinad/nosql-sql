var _ = require('underscore');
const MAX_CLAUSES_AND = 20;

module.exports = {
    /**
     * Get a value indicating if the query has valid syntax for the command
     *
     * @param key {String} The key
     * @param value {Object} The value
     */
    validate: (key, value) => {
        if (!_.isArray(value) || value.length < 2) {
            throw new Error('Invalid $and value: ' + value);
        }

        if (value.length > MAX_CLAUSES_AND) {
            throw new Error('Exceeded limit of ' + MAX_CLAUSES_AND + ' in $and');
        }
    },
    /**
     * Handle the building of the command for the query
     *
     * @param parentKey {String} The key associated with the command
     * @param value {Object} The value
     * @param queryBuilder {QueryBuilder}
     */
    handle: (parentKey, value, queryBuilder) => {
        queryBuilder.appendRawString('(');
        queryBuilder.buildQueryInternal(value[0]);

        for (var i = 1; i < value.length; i++) {
            queryBuilder.appendRawString(' AND ');
            queryBuilder.buildQueryInternal(value[i]);
        }
        queryBuilder.appendRawString(')');
    }
};
