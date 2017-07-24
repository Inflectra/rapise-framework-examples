//Use 'Record/Learn' button to begin test recording

function Test()
{
	Global.DoInvokeTest('%WORKDIR%/CreateNewBook/CreateNewBook.sstest');
	Global.DoInvokeTest('%WORKDIR%/CreateNewAuthor/CreateNewAuthor.sstest');
}

g_load_libraries=["%g_browserLibrary:Internet Explorer HTML%"]

