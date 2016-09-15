var _ = require('underscore');
var path = require('path');
var fs = require('fs');

var clauseFiles = fs.readdirSync(__dirname);

// Register all of the clauses
_.each(clauseFiles, function (file) {
    var clause = path.parse(file).name;

    if (!clause.startsWith('$')) {
        return;
    }

    // Export the clause
    module.exports[clause] = require(path.join(__dirname, file));
});
