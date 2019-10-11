/*********************************************************************************
 * SmarteStudio is a GUI testing framework developed by
 * SmarteSoft, Inc. Copyright (C) 2008 - 2013 SmarteSoft Inc.
 *
 * The  copyright  to  the document(s)  herein  is  the property of     
 * SmarteSoft, Inc.                                                     
 * 
 * The document(s) may be used  and/or copied only with the written
 * permission from SmarteSoft, Inc.  or in accordance with
 * the terms  and conditions  stipulated in the  agreement/contract
 * under which the document(s) have been supplied.                      
 ********************************************************************************/

// Documented/pass1

/**
 * @fileOverview
 * SeSExecutor is a command line tool to run test sets or single test..
 */
 
//#region Initialization

function SeSExecutor()
{

/**
 * @ignore
 */
var WshShell = new ActiveXObject("WScript.Shell");
var fso = new ActiveXObject("Scripting.FileSystemObject");
var fullReport = WshShell.CurrentDirectory + "\\regression_summary.trp";
var lastReport = WshShell.CurrentDirectory + "\\last.trp";
var lastOutput = WshShell.CurrentDirectory + "\\summary{ind}.log";

if ("undefined" == typeof(g_executeEmbedded))
{
	g_executeEmbedded = false;
}

if ("undefined" == typeof(g_testSetPath))
{
	g_testSetPath = "TestSet.js";
}

if ("undefined" == typeof(g_testSetParams))
{
	g_testSetParams = {};
}

/**
 * @ignore
 */
function getUtil()
{
	try
	{
		var util = new ActiveXObject("SeSWrappers.Util");
		return util;
	}
	catch(e)
	{
		Log("Failed to create Util: " + e);
		WScript.Quit(-1);
	}
}

/**
 * @ignore
 */
var g_util = getUtil();

/**
 * @ignore
 */
function getHelper()
{
	try
	{
		var helper = new ActiveXObject("SeSHelper");
		helper.SetHost(WScript);
		helper.RegisterIncludePath(g_util.GetEngineSettings().UserScripts);
		helper.RegisterIncludePath(helper.GetEnginePath());
		helper.SetUtil(g_util);
		return helper;
	}
	catch(e)
	{
		Log("Failed to create Helper: " + e);
		WScript.Quit(-1);
	}
}

/**
 * @ignore
 */
/*#import:SeSHelperLib.xml*/
var g_helper = /**SeSHelper*/getHelper();

/**
 * @ignore
 */
function getTestFactory()
{
	try
	{
		var factory = new ActiveXObject("SmarteStudio.Test.Test");
		return factory;
	}
	catch(e)
	{
		Log("Failed to create Test Factory: " + e);
		WScript.Quit(-1);
	}
}

/**
 * @ignore
 */	 
var g_testFactory = getTestFactory();

eval(g_helper.Include("SeSCommon.js"));
eval(g_helper.Include("SeSExecutionMonitor.js"));
eval(g_helper.Include("JSON.js"));

//#endregion

// TODO: Specify log files for script output
/**
 * Implementation of test execution logic.
 * @ignore
 */
function executeTest(testPath, ind, params)
{
	ind = ind||"";
    params = params||{};
	// Load test
	var test = g_testFactory.LoadFromFile(testPath);

	if (!test || test == null)
	{
		if (l1) Log1("Failed to load test: " + testPath);
		return -1;
	}

	var wd = workingDirectory.replace(/\\/g, "\\\\");
    var sl = lastOutput.replace(/\\/g, "\\\\").replace("{ind}", "" + ind);
	var lr = lastReport.replace(/\\/g, "\\\\");

	// Get command line parameters
	var cmdLinePars = "\"-eval:g_verboseLevel=" + g_verboseLevel + "\"";
	cmdLinePars += " " + test.GetCommonCommandLineParams();
	cmdLinePars += " " + "\"-eval:g_logToFile=true;g_logFileName=\'" + sl + "\'\"";
	cmdLinePars += " " + "\"-eval:g_reportFileName=\'" + lr +"\'\"";
	if (g_enablePopupMessages == false)
	{
		cmdLinePars += " " + "\"-eval:g_enablePopupMessages=false\"";
	}
	if (g_testPrefix != '')
	{
		cmdLinePars += " " + "\"-eval:g_testPrefix=\'" + g_testPrefix + "\'\"";
	}
	
	// Bypass 
	for(var tPar in g_testSetParams)
	{
		var escVal = g_testSetParams[tPar];
		if(typeof(escVal)=="string")
		{
            escVal=JSON.stringify(escVal);
            if (escVal.length > 1)
            {
                // Remove double quotes at begin and end
                escVal = escVal.substr(1, escVal.length - 2);
            }            
			escVal=escVal.replace(/\"/g, '""').replace(/'/g, "\\'");
		} else {
			escVal=""+escVal;
		}
		
		cmdLinePars += " " + "\"-eval:"+tPar+"=\'" + escVal +"\'\"";
	}
    
	for(var tPar in params)
	{
		var escVal = params[tPar];
		if(typeof(escVal)=="string")
		{
			escVal=escVal.replace(/\"/g, '""');
		} else {
			escVal=""+escVal;
		}
		
		cmdLinePars += " " + "\"-eval:"+tPar+"=\'" + escVal +"\'\"";
	}    
	
	if (l2) Log2("Command line parameters: " + cmdLinePars);

	// Prepare command line
	var runner = "\"" + g_helper.GetEnginePath() + "\\rsplay.bat\"";
	var commandLine = runner + " \"" + test.GetScriptPath() + "\" " + cmdLinePars;
	if (l2) Log2("Command line: " + commandLine);

	// Working directory
	var wrkDir = test.TestFolder;
	if (l2) Log2("Working directory: " + wrkDir);

	// Run the test
	//g_util.CreateProcess(cmdLine, wrkDir);
	var testSetDirectory = WshShell.CurrentDirectory;
	WshShell.CurrentDirectory = wrkDir;
	//var result = WshShell.Run(commandLine, 2, true);
	
	// Execute test with 10 minutes timeout
	var result = g_util.Run(commandLine, wrkDir, /*10 * 60000*/-1, true);
	
	// If test is was terminated due to timeout, reflect it in the logfile
	if (result == -3)
	{
		 g_helper.Init(lastReport);
		 g_helper.WriteSummaryXml(
		   "<log type=\"Test\""+
		   " status=\"Fail\""+
		   " comment=\"Timeout\""+
		   " at=\""+g_helper.CurrDateStr()+"\" />"
		  );
		  g_helper.Init(fullReport);
	}

	if(g_helper.FileExists(lastReport))
	{
		var fullContent = g_helper.FileRead(lastReport);
		g_helper.WriteSummaryXml(fullContent);
		g_helper.WriteSummaryXml('<log type="Test" closed="true"/>');
	}
	
	WshShell.CurrentDirectory = testSetDirectory;
	
	return result;
}

/**
 * @ignore
 */
function _getStatusString(result, expected)
{
	// Decode test status
	var status = "UNRESOLVED";
	if (result == 0)
	{
		status = "PASS";
	}
	else if (result == 1)
	{
		status = "FAIL";
	}
	else if (result == -5)
	{
		status = "UNRESOLVED (SKIPPED BY USER)";
	}

	
	// Determine XPASS or XFAIL
	if ("FAIL" == expected && "FAIL" == status)
	{
		return "XFAIL";
	}
	
	if ("FAIL" == expected && "PASS" == status)
	{
		return "XPASS";
	}
	
	return status;
}

function _readArguments()
{
    Log("Total arguments:" + WScript.Arguments.length);
    var objArgs = WScript.Arguments;
    for (var i = 1; i < objArgs.length; i++)
    {
        Log("Argument:" + objArgs(i));
        var arg = objArgs(i);
        if (arg.indexOf("-eval:") == 0)
        {
            var evalStr = arg.substring("-eval:".length);
            Log("Initializing:" + evalStr);
            eval(evalStr);
        }
    }
}

function _initializeLogging()
{
    for (var i = 0; i < 5; i++)
    {
        // Set all verbose levels
        if (i <= g_verboseLevel)
            eval("l" + i + "=true;");
        else
            eval("l" + i + "=false;");
    }
    Log("Verbose level:" + g_verboseLevel);
}

/**
 * @ignore
 */
function _incrementStatusCounters(status)
{
	if ("PASS" == status)
	{
		passCount++;
	}
	else if ("FAIL" == status)
	{
		failCount++;
	}
	else if ("XFAIL" == status)
	{
		xfailCount++;
	}
	else if ("XPASS" == status)
	{
		xpassCount++;
	}
	else
	{
		unresolvedCount++;
	}
}

/**
 * @ignore
 */
function _defined(obj)
{
	if("undefined" != typeof(obj) && null != obj)
	{
		return true;
	}
	return false;
}

///////////////////////////////////////
/// SeS Executor Logic

/**
 * Counters for calculating test set summary.
 * @ignore
 */
var passCount = 0;
var failCount = 0;
var xpassCount = 0;
var xfailCount = 0;
var unresolvedCount = 0;
var skippedCount = 0;

/**
 * If set to 'true' then execution is stopped after the first test is failed.
 * @ignore
 */
var stopOnError = false;
g_verboseLevel = 1;

var workingDirectory = WshShell.CurrentDirectory;

WScript.Echo("SeS Executor Starting...");

// Read Command Line Arguments
/**
 * Path to a test set or a test.
 * @ignore
 */
var testSetPath = null;

var g_excludeFile = '';
var g_includeFile = '';
var g_testPrefix = '';
var g_enablePopupMessages=false;

if (!g_executeEmbedded)
{
	if (WScript.Arguments.length > 0)
	{
		testSetPath = WScript.Arguments(0);
	}
	_readArguments();
}
else
{
	testSetPath = g_testSetPath;
}

g_helper.EnablePopupMessages(g_enablePopupMessages);

if (null == testSetPath)
{
	WScript.Echo("Please, specify a Test Set or a single Test to run.");
	WScript.Quit(-1);
}
else
{
	if (testSetPath.toLowerCase().indexOf(".sstest") != -1)
	{
		Log("Test" + testSetPath);
		RunSingleTest();
	}
	else
	{
		Log("Test Set: " + testSetPath);
		RunTestSet();
	}
}

/**
 * Executes a single test.
 * @ignore
 */
function RunSingleTest()
{
	fullReport = WshShell.CurrentDirectory + "\\" + fso.GetBaseName(testSetPath) + ".trp";

  if(g_helper.FileExists(fullReport))
  {
    g_helper.DeleteFile(fullReport);
  }
  
	// Initialize Log functions
	_initializeLogging();
	g_helper.Init(fullReport);

	//////// Do not use LogX functions above this point	
	if (l1) Log1("RUNNING: " + testSetPath);
	var result = executeTest(testSetPath);
	var status = _getStatusString(result, "PASS");
	Log("\n\n");
	Log("STATUS:  " + status + "\n");
	Log("\n");
	Log("Test was successfully executed!");	
	
	if(!g_executeEmbedded)
	{
		WScript.Quit(result);
	}
	
	return result;
}

/**
 * Executes a test set.
 * @ignore
 */
function RunTestSet()
{
	// Read Test Set
	eval(g_helper.Include(testSetPath));
	if (!_defined(testSet) || !_defined(testSet._))
	{
		WScript.Echo("error: bad test set");
		WScript.Quit(-1);
	}

	g_executionMonitor.BeginTestSet(testSetPath);

	// Read Test Set Parameters
	if (_defined(testSet.stopOnError))
	{
		stopOnError = testSet.stopOnError;
	}

	if (_defined(testSet.verboseLevel))
	{
		g_verboseLevel = testSet.verboseLevel;
	}
	
	if (_defined(testSet.reportFileName))
	{
		fullReport = WshShell.CurrentDirectory + "\\" + testSet.reportFileName;
	}
	else
	{
		fullReport = WshShell.CurrentDirectory + "\\" + fso.GetBaseName(testSetPath) + ".trp";
	}
	 
	// Initialize Log functions
	_initializeLogging();
	g_helper.Init(fullReport);

	//////// Do not use LogX functions above this point

	// Print description
	if (_defined(testSet.description))
	{
		Log("\n" + testSet.description + "\n");
	}

	// Get number of tests to run
	var testCount = testSet._.length;
	if (_defined(testSet.testCount) && testSet.testCount <= testSet._.length && testSet.testCount >= 0)
	{
		testCount = testSet.testCount;
	}
	
	var exclude = null;
	var include = null;
	if (g_excludeFile != '' && g_helper.FileExists(g_excludeFile))
	{
		exclude = g_helper.FileRead(g_excludeFile);
	}
	
	if (g_includeFile != '' && g_helper.FileExists(g_includeFile))
	{
		include = g_helper.FileRead(g_includeFile);
	}

	// Execute
	Log("Going to run " + testCount + " of " + testSet._.length + " tests...");
	var cmdLinePars = '';
	for(var tPar in g_testSetParams)
	{
		var escVal = g_testSetParams[tPar];
		if(typeof(escVal)=="string")
		{
			escVal=escVal.replace(/\"/g, '""');
		} else {
			escVal=""+escVal;
		}
		
		cmdLinePars += " " + tPar+ "=\'" + escVal + '\'';
	}
	Log("Params: " +  cmdLinePars + "\n");

	for (var i = 0; i < testCount; i++)
	{
		g_executionMonitor.SetTestSetStatus(i*100/testCount);
		g_executionMonitor.SetExecutionStatus(passCount, failCount, unresolvedCount);

		var testPath = "";
        var params = {};
		var expected = "PASS";
        
        if (typeof(testSet._[i]) == "string")
        {
            testPath = testSet._[i];
        }
        else if (typeof(testSet._[i]) == "object")
        {
            testPath = testSet._[i].path;
            
            if (_defined(testSet._[i].params))
            {
                params = testSet._[i].params;
            }
            
            if (_defined(testSet._[i].expected))
            {
                expected = testSet._[i].expected;
            }
        }
        
		if (testPath.indexOf(":") == -1)
		{
			testPath =  workingDirectory + "/" + testPath;
		}
		
		var testName = g_testPrefix + fso.GetBaseName(testPath);
		if (l1) Log1("RUNNING: " + testName);
		
		if (cmdLinePars != '')
		{
			testName += ' (' + cmdLinePars + ')';
		}
		
		if ((include && include.indexOf(testName) == -1) || (exclude && exclude.indexOf(testName) != -1))
		{
			Log("STATUS:  SKIP\n");
			g_executionMonitor.SetStatusMessage("Skip: "+testName);
			skippedCount++;
			continue;
		}

		g_executionMonitor.SetStatusMessage("Starting: "+testName);
		var result = executeTest(testPath, i, params);
		
		if (typeof(testSet._[i]) == "object" && _defined(testSet._[i].comment))
		{
			Log("COMMENT: " + testSet._[i].comment);
		}
		
		if (l2) Log2("Result: " + result);
		var status = _getStatusString(result, expected);
		Log("STATUS:  " + status + "\n");
        
        g_executionMonitor.SetStatusMessage(testName+":"+status);

		_incrementStatusCounters(status);
		
		if (stopOnError && ("FAIL" == status || "UNRESOLVED" == status || "XPASS" == status))
		{
			Log("Stopping execution...");
			break;
		}

	}
	g_executionMonitor.SetTestSetStatus(100);
	
	Log("\n\n");
	Log("SUMMARY: TOTAL:" + testCount + ", PASS:" + passCount + ", FAIL:" + failCount + ", XPASS:" + xpassCount + ", XFAIL:" + xfailCount + ", UNRESOLVED:" + unresolvedCount + ", SKIPPED:" + skippedCount);
	Log("\n\n");
	Log("Test Set was successfully executed!");

	g_executionMonitor.EndTestSet(0);
}

}//SeSExecutor

SeSExecutor();
