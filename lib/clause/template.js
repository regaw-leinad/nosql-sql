var _ = require('underscore');

module.exports = {
    /**
     * Get a value indicating if the query has valid syntax for the clause
     *
     * @param key {String} The key
     * @param value {Object} The value
     * @param [nestedClause] {Boolean} If the clause is used as a nested clause
     */
    validate: (key, value, nestedClause) => {
    },
    /**
     * Handle the building of the clause for the query
     *
     * @param queryBuilder {QueryBuilder}
     * @param parentKey {String} The key associated with the clause
     * @param value {Object} The value
     */
    handle: (queryBuilder, parentKey, value) => {
    }
};
