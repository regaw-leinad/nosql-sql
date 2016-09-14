var _ = require('underscore');

module.exports = {
    /**
     * Get a value indicating if the query has valid syntax for the command
     *
     * @param key {String} The key
     * @param value {Object} The value
     * @param [innerCommand] {Boolean} If the command is used as an inner command
     */
    validate: (key, value, innerCommand) => {
    },
    /**
     * Handle the building of the command for the query
     *
     * @param queryBuilder {QueryBuilder}
     * @param parentKey {String} The key associated with the command
     * @param value {Object} The value
     */
    handle: (queryBuilder, parentKey, value) => {
    }
};
