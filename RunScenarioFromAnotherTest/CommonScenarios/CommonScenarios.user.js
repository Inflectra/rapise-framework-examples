//Put your custom functions and variables in this file


function LoginPage_Login(userName, password)
{
	Tester.Assert("Login", true, [new SeSReportText(userName), new SeSReportText(password) ]);
}

function LoginPage_Logout()
{
	Tester.Assert("Logout", true);
}
