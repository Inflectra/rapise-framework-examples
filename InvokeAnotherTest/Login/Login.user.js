//Put your custom functions and variables in this file

Login = function(/**string*/ userName, /**string*/ password)
{
	Tester.Assert("Login scenario", true, [new SeSReportText(userName), new SeSReportText(password) ]);
}
