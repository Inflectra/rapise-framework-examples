//Use 'Record/Learn' button to begin test recording

function Test(params)
{
	SeSConnectMobile();
	
	g_mobileTestName = "Signup";

	RVL.DoPlayScript("%WORKDIR%\\TC_Signup\\Main.rvl.xlsx", Tester.GetParam("sheetName", "RVL"));
}

g_load_libraries=["Mobile", "Web Service", "%g_browserLibrary%"];

