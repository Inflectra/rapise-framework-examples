//Use 'Record/Learn' button to begin test recording

function Test(params)
{
	SeSConnectMobile();
	
	g_mobileTestName = "Login";

	RVL.DoPlayScript("%WORKDIR%\\TC_Login\\Main.rvl.xlsx", Tester.GetParam("sheetName", "RVL"));
}

g_load_libraries=["Mobile", "Web Service"];

