//Put your custom functions and variables in this file


function Login(/**string*/ userName, /**string*/ password)
{
	Tester.Assert("Login", true, [new SeSReportText(userName), new SeSReportText(password) ]);
}

function Logout()
{
	Tester.Assert("Logout", true);
}
