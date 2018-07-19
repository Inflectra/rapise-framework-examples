
function TestPrepare()
{
	if (g_recording)
	{
		g_UIAutomationWrapper.DeepPointTracking(true);
	}
}



function Test(params)
{
	RVL.DoPlayScript('%WORKDIR%/USDCallScript/USDCallScript.rvl.xlsx');//========== Recorded at Wednesday, July 18, 2018 11:00:31 PM: ======

}

g_load_libraries=["UIAutomation"];


