
DomCustomControlsPlugin = 
{
	pluginId: "DomCustomControlsPlugin",
	include: "Lib/LibDomCustomControls/LibDomCustomControlsRecorder.js",
	attachFunctionName: "DomCustomControlsPluginAttach",
	
	Init: function()
	{
		return true; //Plugin initialized
	}
} 

eval(g_helper.IncludeOnce("Lib/LibDomCustomControls/LibDomCustomControlsRules.js"));

function DomCustomControls_OnXPathNotFound(xpath)
{
	if (l3) Log3("OnXPathNotFound");

	var newXpath = xpath;

	
	if (l3) Log3("New XPATH: " + newXpath);
	
	return newXpath;
}

g_xpathNotFoundCallbacks.push(DomCustomControls_OnXPathNotFound);


function DomCustomControls_SeSOnActionRecording(/**SeSObject*/ obj, /**string*/ item, /**string*/ action, /**object*/ param, /**string*/ descr, /**boolean*/override, /**boolean*/show)
{
	if (obj && obj.object_info && obj.object_info.xpath)
	{
		obj.object_info.xpath = DomCustomControls_OnXPathNotFound(obj.object_info.xpath);
	}
	return false;
}

g_sesOnActionRecordedImpl.push(DomCustomControls_SeSOnActionRecording);

// For Chrome to calculate coordinates correctly
g_chromeSingleWindow = true;
