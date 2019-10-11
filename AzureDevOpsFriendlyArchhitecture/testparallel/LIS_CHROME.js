var rapise = require('../rapise')
var tap = require('tap')
var path = require('path');

var testName = "LIS";

var context = [];
context.push({name: "g_playerThread", value: "_CHROME"});
context.push({name: "g_browserLibrary", value: "Selenium - Chrome"});

rapise.runParallel(testName, context, function(exit_code) {
    tap.ok(exit_code == 0, testName);    
})
