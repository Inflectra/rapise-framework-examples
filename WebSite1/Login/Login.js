


function Test()
{

	SeS('Log_In').DoClick();
	SeS('Username_').DoSetText("librarian");
	SeS('Password_').DoSetText("librarian");
	SeS('ctl00$MainContent$LoginUser$Logi').DoClick();
	Tester.AssertEqual("Verify that: InnerText=librarian", SeS('librarian').GetInnerText(), "librarian");

}

g_load_libraries=["%g_browserLibrary:Internet Explorer HTML%"];


