


function Test(params)
{
	Navigator.Open("http://libraryinformationsystem.org");
	Navigator.SetSize(640, 480);

	RVL.DoPlayScript("Main.rvl.xlsx", "RVL");
}

g_load_libraries=["%g_browserLibrary:Chrome HTML%"];


