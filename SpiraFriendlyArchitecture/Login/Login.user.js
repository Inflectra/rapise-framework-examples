//Put your custom functions and variables in this file


/** @scenario Login*/
function Login(/**string*/ userName, /**string*/ password)
{
	SeS('Log_In').DoClick();
	SeS('Username_').DoSetText(userName);
	SeS('Password_').DoSetText(password);
	SeS('ctl00$MainContent$LoginUser$Logi').DoClick();

	Tester.AssertEqual("Verify that: InnerText=" + userName, SeS('librarian').GetInnerText(), userName);
}
