var rapise = require('../rapise')
var tap = require('tap')
var path = require('path');

var testName = path.basename(__filename);

rapise.run(testName, function(exit_code) {
    tap.ok(exit_code == 0, testName);    
})
