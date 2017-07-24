


function Test()
{
	Global.DoInvokeTest('%WORKDIR%/Login/Login.sstest');
	
	SeS('Author_Management').DoClick();
	SeS('_Create_new_author_').DoClick();
	SeS('Name_1').DoSetText("James Fenimore Cooper");
	SeS('Age_').DoSetText("62");
	SeS('ctl00$MainContent$btnSubmit1').DoClick();
	Tester.AssertEqual("Verify that: InnerText=James Fenimore Cooper", SeS('James_Fenimore_Cooper').GetInnerText(), "James Fenimore Cooper");

	Global.DoInvokeTest('%WORKDIR%/Logout/Logout.sstest');
}

g_load_libraries=["%g_browserLibrary:Internet Explorer HTML%"];


