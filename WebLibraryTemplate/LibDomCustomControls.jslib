
SeSRegisterLibrary(
{
	name: 'DomCustomControls',
	description: 'User-defined library for custom Web controls',
	include: 'Lib/LibDomCustomControls/LibDomCustomControls.js',
	info: null,
	load_order: 1000,   
	object_type: "",
	dependencies: {
		"HTML": 
		{
			"Chrome HTML": "1.0",
			"Internet Explorer HTML": "1.0",
			"Firefox HTML": "1.0"
		}
	},
	libinit: function(libinfo) 
	{
		SeSHTMLRegisterPlugin(DomCustomControlsPlugin);
	},
	libfinish: function(libinfo)
	{
	},
	libcheck: function()
	{
		return false;
	},
	libcheckweb: function()
	{
		/**
		 * Load this library if a page contains specific element
		 * or url of a page contains some text.
		 */
		 
		var xpathOfElement = "/html";
		var urlPart = "";
		
		var res1 = true;
		if (xpathOfElement)
		{
			res1 = Navigator.CheckObjectExists(xpathOfElement);
		}
		
		var res2 = true;
		if (res1 && urlPart)
		{
			var browserUrl = Navigator.GetUrl();
			res2 = browserUrl.indexOf(urlPart) > -1;
		}
		
		return res1 && res2;
	}
}
);