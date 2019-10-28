var exec = require('child_process').exec;
var path = require("path");
var fs = require("fs");

console.log("Post processing reports...");

var summarize = false;
if (process.argv.length > 2)
{
    if (process.argv[2] == "--summarize")
    {
        summarize = true;
    }
}

var reportsFolder = "reports";
var resultsFolder = "results";

var foundParts = fs.readdirSync(reportsFolder);
foundParts.forEach((part)=>
{
    var pp = path.resolve(reportsFolder, part);
    if(fs.statSync(pp).isFile()) 
    {
        var tapPath = pp;
        if (tapPath.endsWith (".tap") && fs.existsSync(tapPath))
        {
            //console.log("tap: " + tapPath);
            var baseName = path.basename(tapPath)
            var xmlPath = path.resolve(resultsFolder, baseName.replace(".tap", ".xml"));
            //console.log("xml: " + xmlPath);
            convert(baseName.replace(".tap", ""), tapPath, xmlPath);
        }
    }
});

function convert(name, tapPath, xmlPath)
{
    var cmdLine = "node ./node_modules/tap/bin/run.js --no-coverage -Rxunit  - < " + JSON.stringify(tapPath) + " > " + JSON.stringify(xmlPath);
    console.log(cmdLine);
    var env = JSON.parse(JSON.stringify(process.env));
    var child = exec(cmdLine, {env:env, maxBuffer: 200*1024*1024, shell:true});

    child.on('close', function(exit_code) 
    {
        if (fs.existsSync(xmlPath))
        {
            console.log("success: " + xmlPath);
            if (summarize)
            {
                fixSummarize(xmlPath, name);
            }
            else
            {
                fixDetail(xmlPath);
            }
        }
        else
        {
            console.log("fail: " + xmlPath);
        }
    });
}

function fixDetail(xmlPath, name)
{
    var text = fs.readFileSync(xmlPath, "utf8");
    text = text.replace(/classname=\"\"/gi, "classname=\"" + name + "\"");
    fs.writeFileSync(xmlPath, text);
}

function fixSummarize(xmlPath, name)
{
    var xpath = require('xpath');
    var dom = require('xmldom').DOMParser;
    var serializer = require('xmldom').XMLSerializer;

    var xml = fs.readFileSync(xmlPath, "utf8");
    var doc = new dom().parseFromString(xml)
    var tcs = xpath.select("//testcase", doc);
    var error = null;
	for(var i = 0; i < tcs.length; i++)
	{
		var tc = tcs[i];
        var tname = tc.getAttribute("name");
        tc.setAttribute("classname", tname);
        if (tname == name)
        {
            var ts = xpath.select1("//testsuite", doc);
            ts.setAttribute("tests", 1);
            if (error)
            {
                ts.setAttribute("failures", 1);
                ts.setAttribute("errors", 1);
                var failure = xpath.select1("./failure", tc);
                if (failure)
                {
                    failure.textContent = error;
                }
            }
            
            while (ts.firstChild)
            {
                ts.removeChild(ts.firstChild);
            }
            ts.appendChild(tc);
        }
        else
        {
            var failure = xpath.select1("./failure", tc)
            if (failure)
            {
                 if (!error)
                 {
                     error = failure.textContent.replace("\nundefined", "");                     
                 }                     
            }
        }
	}    
    
    var text = new serializer().serializeToString(doc);
    fs.writeFileSync(xmlPath, text);
}

console.log("done");