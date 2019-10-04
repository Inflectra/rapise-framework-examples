var WshShell = new ActiveXObject("WScript.Shell");
var fso = new ActiveXObject("Scripting.FileSystemObject");

var resultsFolder = "./results";

var folderInfo = fso.GetFolder(resultsFolder);

var e = new Enumerator(folderInfo.Files);
for (;!e.atEnd();e.moveNext()) 
{
	var file = e.item();
    var fName = file.Name;
    if (fName.indexOf(".xml") != -1)
    {
        var name = fName.replace(".xml", "");
        fix(resultsFolder + "/" + fName, name);
    }
}

function fix(fName, name)
{
	var xmlDoc = null;
	
	try
	{
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	}
	catch(e)
	{
		WScript.Echo(e.message);
	}
	
	xmlDoc.async = false;
	xmlDoc.load(fName);
	
    var tcs = xmlDoc.selectNodes("//testcase");
    var error = null;
	for(var i = 0; i < tcs.length; i++)
	{
		var tc = tcs[i];
        var tname = GetAttribute(tc, "name");
        if (tname == name)
        {
            var ts = xmlDoc.selectSingleNode("//testsuite");
            SetAttribute(ts, "tests", 1);
            if (error)
            {
                SetAttribute(ts, "failures", 1);
                SetAttribute(ts, "errors", 1);
                var failure = tc.selectSingleNode("./failure");
                if (failure)
                {
                    failure.text = error;
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
            var failure = tc.selectSingleNode("./failure")
            if (failure)
            {
                 if (!error)
                 {
                     error = failure.text.replace("\nundefined", "");                     
                 }                     
            }
        }
	}    
    
    xmlDoc.save(fName);
}

function GetAttribute(el, name)
{
    return el.attributes.getNamedItem(name).value;
}

function SetAttribute(el, name, value)
{
    el.attributes.getNamedItem(name).value = value;
}

