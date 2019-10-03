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
    var file = fso.openTextFile(fName, 1);
    var sText = file.readAll()+"";
    file.Close();
    
    sText = sText.replace(/classname=\"\"/gi, "classname=\"" + name + "\"");
    
    var file = fso.openTextFile(fName, 2);
	file.Write(sText);
	file.Close();
}

