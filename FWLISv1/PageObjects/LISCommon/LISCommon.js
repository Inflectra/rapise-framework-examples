function LISCommon_DoLogin(/**string*/user, password)
{
	var res = SeSPageObjectRvlInvoke(
		this,
		__dirname+"\\Test.sstest",
		__dirname+"\\Main.rvl.xlsx",
		"DoLogin",
		{
			user: user,
			password: password
		}
	);
	return res;
}

var _paramInfoLISCommon_DoLogin={
	"_description": "Login LIS using provided username and password",
	"_type": "object",
	"_returns": "",
	"user": {
		"type": "string"
	},
	"password": {
		"type": "object"
	},
	"ReturnValue": {
		"type": "object"
	}
};

function LISCommon_DoLogout()
{
	var res = SeSPageObjectRvlInvoke(
		this,
		__dirname+"\\Test.sstest",
		__dirname+"\\Main.rvl.xlsx",
		"DoLogout",
		{
		}
	);
	return res;
}

var _paramInfoLISCommon_DoLogout={
	"_description": "Logout from LIS",
	"_type": "object",
	"_returns": ""
};

function LISCommon_VerifyLoggedUser(/**string*/UserName)
{
	var res = SeSPageObjectRvlInvoke(
		this,
		__dirname+"\\Test.sstest",
		__dirname+"\\Main.rvl.xlsx",
		"VerifyLoggedUser",
		{
			UserName: UserName
		}
	);
	return res;
}

var _paramInfoLISCommon_VerifyLoggedUser={
	"_description": "VerifyLoggedUser description",
	"_type": "object",
	"_returns": "",
	"UserName": {
		"type": "string"
	},
	"ReturnValue": {
		"type": "object"
	}
};

function LISCommon_DoLoginAs(/**string*/UserName)
{
	var res = SeSPageObjectRvlInvoke(
		this,
		__dirname+"\\Test.sstest",
		__dirname+"\\Main.rvl.xlsx",
		"DoLoginAs",
		{
			UserName: UserName
		}
	);
	return res;
}

var _paramInfoLISCommon_DoLoginAs={
	"_description": "DoLoginAs description",
	"_type": "object",
	"_returns": "",
	"UserName": {
		"type": "string"
	},
	"ReturnValue": {
		"type": "object"
	}
};

function LISCommon_IsLoggedIn()
{
	var res = SeSPageObjectRvlInvoke(
		this,
		__dirname+"\\Test.sstest",
		__dirname+"\\Main.rvl.xlsx",
		"IsLoggedIn",
		{
		}
	);
	return res;
}

var _paramInfoLISCommon_IsLoggedIn={
	"_description": "IsLoggedIn description",
	"_type": "object",
	"_returns": "",
	"ReturnValue": {
		"type": "object"
	}
};

function LISCommon_DoGoTo(/**string*/ModuleName)
{
	var res = SeSPageObjectRvlInvoke(
		this,
		__dirname+"\\Test.sstest",
		__dirname+"\\Main.rvl.xlsx",
		"DoGoTo",
		{
			ModuleName: ModuleName
		}
	);
	return res;
}

var _paramInfoLISCommon_DoGoTo={
	"_description": "DoGoTo description",
	"_type": "object",
	"_returns": "",
	"ModuleName": {
		"type": "string"
	},
	"ReturnValue": {
		"type": "object"
	}
};

function LISCommon_VerifyScreenText(/**string*/textToCheck)
{
	var res = SeSPageObjectRvlInvoke(
		this,
		__dirname+"\\Test.sstest",
		__dirname+"\\Main.rvl.xlsx",
		"VerifyScreenText",
		{
			textToCheck: textToCheck
		}
	);
	return res;
}

var _paramInfoLISCommon_VerifyScreenText={
	"_description": "VerifyScreenText description",
	"_type": "object",
	"_returns": "",
	"textToCheck": {
		"type": "string"
	},
	"ReturnValue": {
		"type": "object"
	}
};

SeSPageObject("LISCommon");
