
function TestPrepare()
{
	if (g_recording)
	{
		g_UIAutomationWrapper.DeepPointTracking(true);
	}
}



function Test(params)
{
	RVL.DoPlayScript('%WORKDIR%/USDCallScript/USDCallScript.rvl.xlsx');

}

g_load_libraries=["UIAutomation"];

