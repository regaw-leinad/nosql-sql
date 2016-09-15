var _ = require('underscore');
const MAX_CLAUSES_AND = 20;

module.exports = {
    /**
     * Get a value indicating if the query has valid syntax for the clause
     *
     * @param key {String} The key
     * @param value {Object} The value
     * @param [nestedClause] {Boolean} If the clause is used as a nested clause
     */
    validate: (key, value, nestedClause) => {
        if (nestedClause) {
            throw new Error('Incorrect syntax using nested $and');
        }

        if (!_.isArray(value) || value.length < 2) {
            throw new Error('Invalid $and value: ' + value);
        }

        if (value.length > MAX_CLAUSES_AND) {
            throw new Error('Exceeded limit of ' + MAX_CLAUSES_AND + ' for $and');
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
        queryBuilder.buildQueryInternal(value[0]);

        for (var i = 1; i < value.length; i++) {
            queryBuilder.appendRawString(' AND ');
            queryBuilder.buildQueryInternal(value[i]);
        }
    }
};
