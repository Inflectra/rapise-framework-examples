


function Test()
{
	Global.DoInvokeTest('%WORKDIR%/Login/Login.sstest');
	
	SeS('Book_Management').DoClick();
	SeS('_Create_new_book_').DoClick();
	SeS('Name_').DoSetText("David Copperfield");
	SeS('Author_').DoSelect("Charles Dickens");
	SeS('Genre_').DoSelect("Murder & Mystery");
	SeS('ctl00$MainContent$btnSubmit').DoClick();
	Tester.AssertEqual("Verify that: InnerText=David Copperfield", SeS('David_Copperfield').GetInnerText(), "David Copperfield");

	Global.DoInvokeTest('%WORKDIR%/Logout/Logout.sstest');
}

g_load_libraries=["%g_browserLibrary:Internet Explorer HTML%"];


