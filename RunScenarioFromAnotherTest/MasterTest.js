
//########## Script Steps ##############

function Test()
{
    // Run login from JavaScript
	Global.DoLoadObjects('./CommonScenarios/CommonScenarios.objects.js');
	LoginPage_Login("diana", "pd1");

	// Run login from RVL
	RVL.DoPlayScript();
}

