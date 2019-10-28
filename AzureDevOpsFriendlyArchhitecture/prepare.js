var path = require('path');
var fs = require('fs');

function mkDir(folderName)
{
    if (!fs.existsSync(folderName))
    {
        fs.mkdirSync(folderName);
    }    
}

function mkFile(fileName)
{
    if (!fs.existsSync(fileName))
    {
        fs.writeFileSync(fileName, "", {file:'w'});
    }    
}

function mkTests(inFolder, fPath)
{
    var foundParts = fs.readdirSync(fPath);
    foundParts.forEach((part)=>
    {
        var pp = path.resolve(fPath, part);
        if(fs.statSync(pp).isDirectory()) 
        {
            var jsonPath = path.resolve(pp, "node.json");
            if (fs.existsSync(jsonPath))
            {
                var dirname = path.basename(pp);
                console.log("test: " + dirname);
                var dst = path.resolve(inFolder, dirname + ".js");
                fs.copyFileSync("test.template.js", dst);
            }
        }
    })    
}

console.log("preparing for test launch...");

var testFolder = "test";
mkDir(testFolder);
mkDir("reports");
mkDir("results");
mkFile(testFolder + "/tap-parallel-not-ok");
mkTests(testFolder, ".");

console.log("done");
