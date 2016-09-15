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
        if (!nestedClause) {
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
     * Handle the building of the clause for the query
     *
     * @param queryBuilder {QueryBuilder}
     * @param parentKey {String} The key associated with the clause
     * @param value {Object} The value
     */
    handle: (queryBuilder, parentKey, value) => {
        queryBuilder.appendKey(parentKey);

        queryBuilder.appendRawString(' BETWEEN ');

        queryBuilder.appendValue(value[0]);
        queryBuilder.appendRawString(' AND ');
        queryBuilder.appendValue(value[1]);
    }
};
