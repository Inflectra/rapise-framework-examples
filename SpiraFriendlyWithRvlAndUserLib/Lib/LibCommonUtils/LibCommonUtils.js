// Put library code here

function TestPrepare()
{
	Global.DoLoadObjects('%WORKDIR%/TestAddition/TestAddition.objects.js');
	Global.DoLoadObjects('%WORKDIR%/TestSubtraction/TestSubtraction.objects.js');

	RVL.DoPlaySpecial('%WORKDIR%/SpiraFriendlyWithRvlAndUserLib.rvl.xlsx', "TestPrepare");
}


function TestFinish()
{
	RVL.DoPlaySpecial('%WORKDIR%/SpiraFriendlyWithRvlAndUserLib.rvl.xlsx', "TestFinish");
}

function EnterNumber(/**string*/strNumber)
{
	var inputField = SeS('Text');
	// Click to set focus for sure
	inputField._DoClick();
	// Now type the number
	Global.DoSendKeys(strNumber);
}

function GetCalcResult()
{
	/**
		Calculator formats result value in accordance with system formatting
		settings.
	*/
	var actual = SeS('Text').GetText();
	actual = Global.DoTrim(actual, true, "\xA0 ,");
	
	return actual;
}