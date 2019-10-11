var rapise = require('../rapise')
var tap = require('tap')
var path = require('path');

var testName = "LIS_REACT";

var context = [];
context.push({name: "g_playerThread", value: "_REACT_IE"});
context.push({name: "g_browserLibrary", value: "Selenium - Internet Explorer"});

rapise.runParallel(testName, context, function(exit_code) {
    tap.ok(exit_code == 0, testName);    
})
