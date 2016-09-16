var _ = require('underscore');
var path = require('path');
var fs = require('fs');

var operatorFiles = fs.readdirSync(__dirname);

// Register all of the operators
_.each(operatorFiles, function (file) {
    var operator = path.parse(file).name;

    if (!operator.startsWith('$')) {
        return;
    }

    // Export the operator
    module.exports[operator] = require(path.join(__dirname, file));
});
