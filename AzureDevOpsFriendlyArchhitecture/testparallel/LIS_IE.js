var rapise = require('../rapise')
var tap = require('tap')
var path = require('path');

var testName = "LIS";

var context = [];
context.push({name: "g_playerThread", value: "_IE"});
context.push({name: "g_browserLibrary", value: "Selenium - Internet Explorer"});

rapise.runParallel(testName, context, function(exit_code) {
    tap.ok(exit_code == 0, testName);    
})
