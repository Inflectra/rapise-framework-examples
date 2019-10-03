var exec = require('child_process').exec;

module.exports = 
{
    run: function(testName, callback)
    {
        testName = testName.replace(/.jsx|.js/i, "");
        var params = null;
        if (process.argv.length > 2)
        {
            params = process.argv[2];
        }        
        
        var cmdLine = "call runtest.cmd " + testName + (params != null ? " \"-eval:g_testSetParams=" + params +"\"": "");
        console.log(cmdLine);
        var env = JSON.parse(JSON.stringify(process.env));
        var child = exec(cmdLine, {env:env, maxBuffer: 200*1024*1024, shell:true});
        child.on('close', function(exit_code) 
        {
            callback(exit_code);
        })
    }
}
