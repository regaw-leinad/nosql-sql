var _ = require('underscore');

module.exports = {
    /**
     * Get a value indicating if the query has valid syntax for the command
     *
     * @param key {String} The key
     * @param value {Object} The value
     */
    validate: (key, value) => {
    },
    /**
     * Handle the building of the command for the query
     *
     * @param parentKey {String} The key associated with the command
     * @param value {Object} The value
     * @param queryBuilder {QueryBuilder}
     */
    handle: (parentKey, value, queryBuilder) => {
    }
};
