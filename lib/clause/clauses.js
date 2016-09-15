var _ = require('underscore');
var path = require('path');
var fs = require('fs');

// The clauses executed with keywords
var clauses = {};

// var clausePath = path.join(__dirname, 'clause');
var clauseFiles = fs.readdirSync(__dirname);

// Register all of the clauses
_.each(clauseFiles, function (file) {
    var name = path.parse(file).name;

    if (!name.startsWith('$')) {
        return;
    }

    clauses[name] = require(path.join(__dirname, file));
});

module.exports = clauses;
