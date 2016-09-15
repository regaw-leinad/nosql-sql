var QueryBuilder = require('./queryBuilder');

/**
 * Builds a DocumentDB query object from MongoDB-style syntax
 *
 * @param queryFilter {Object} The MongoDB-style object to build query from
 * @return {DocDBQuery} The DocumentDB query object
 */
module.exports = function buildQuery (queryFilter) {
    return new QueryBuilder(queryFilter).build();
};
