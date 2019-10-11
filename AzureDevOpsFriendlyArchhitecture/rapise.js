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
    },
    
    runParallel: function(testName, context, callback)
    {
        testName = testName.replace(/.jsx|.js/i, "");
        var params = null;
        if (process.argv.length > 2)
        {
            params = process.argv[2];
        }
        
        if (!params)
        {
            params = "{}";            
        }
        
        params = JSON.parse(params);
        
        if (context)
        {
            for(var i = 0; i < context.length; i++)
            {
                var ctx = context[i];
                params[ctx.name] = ctx.value;                
            }
        }
        
        var cmdLine = "call runtest.cmd " + testName + (params != null ? " \"-eval:g_testSetParams=" + JSON.stringify(params).replace(/\"/g, "'") + "\"": "") 

        {
            var executorContext = [];
            executorContext.push({name: "lastReport", value: "WshShell.CurrentDirectory+'\\..\\reports\\tap.trp'"});
            executorContext.push({name: "lastOutput", value: "WshShell.CurrentDirectory+'\\..\\reports\\tap%THREAD%.log'"});        
            for(var i = 0; i < executorContext.length; i++)            
            {
                var ctx = executorContext[i];
                cmdLine += " \"-eval:" + ctx.name + "=" + ctx.value.replace(/\\/g, "\\\\") + "\"";
            }
        }
        
        //console.log(cmdLine);
        var env = JSON.parse(JSON.stringify(process.env));
        var child = exec(cmdLine, {env:env, maxBuffer: 200*1024*1024, shell:true});
        child.on('close', function(exit_code) 
        {
            callback(exit_code);
        })
    }
}
