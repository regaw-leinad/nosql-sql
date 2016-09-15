var _ = require('underscore');
var path = require('path');
var fs = require('fs');

var clauseFiles = fs.readdirSync(__dirname);

// Register all of the clauses
_.each(clauseFiles, function (file) {
    var name = path.parse(file).name;

    if (!name.startsWith('$')) {
        return;
    }

    // Export the clause
    module.exports[name] = require(path.join(__dirname, file));
});
