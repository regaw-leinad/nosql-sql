var _ = require('underscore');

module.exports = {
    /**
     * Get a value indicating if the query has valid syntax for the clause
     *
     * @param key {String} The key
     * @param value {Object} The value
     * @param [nestedClause] {Boolean} If the clause is used as a nested clause
     */
    validate: function (key, value, nestedClause) {
        if (!nestedClause) {
            throw new Error('Incorrect syntax using $gte: Must be nested');
        }

        if (!_.isString(value) && !_.isNumber(value)) {
            throw new Error('Argument to $gte must be either a string or number');
        }
    },
    /**
     * Handle the building of the clause for the query
     *
     * @param queryBuilder {QueryBuilder}
     * @param parentKey {String} The key associated with the clause
     * @param value {Object} The value
     */
    handle: function (queryBuilder, parentKey, value) {
        queryBuilder.appendKey(parentKey);
        queryBuilder.appendRawString(' >= ');
        queryBuilder.appendValue(value);
    }
};
