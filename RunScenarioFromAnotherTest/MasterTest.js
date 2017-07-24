
//########## Script Steps ##############

function Test()
{
    // Run Login from JavaScript
	Global.DoLoadObjects('./CommonScenarios/CommonScenarios.objects.js');
	Login("diana", "pd1");

	// Run Login from RVL
	RVL.DoPlayScript();
}

