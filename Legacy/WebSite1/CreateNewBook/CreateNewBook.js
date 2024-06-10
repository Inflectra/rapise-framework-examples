


function Test()
{
	Global.DoInvokeTest('%WORKDIR%/Login/Login.sstest');

	SeS('Book_Management').DoClick();
	SeS('_Create_new_book_').DoClick();
	SeS('Name_').DoSetText("Harry Potter");
	SeS('ctl00$MainContent$btnSubmit').DoClick();
	Tester.AssertEqual("Verify that: InnerText=Harry Potter", SeS('Harry_Potter').GetInnerText(), "Harry Potter");
	
	Global.DoInvokeTest('%WORKDIR%/Logout/Logout.sstest');
}

g_load_libraries=["%g_browserLibrary:Internet Explorer HTML%"];


