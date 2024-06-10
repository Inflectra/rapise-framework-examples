//Put your custom functions and variables in this file

g_browserLibrary = "Chrome";
g_mobileProfile = "Crate iOS SeeTest";
//g_mobileProfile = "Crate iOS Browserstack";

g_recordUrls = false;

function TestFinish()
{
	// capture screenshot on test failure
	if(Tester.GetTestStatus() != Tester.Pass)
	{
		if (IsMobileTest())
		{
			iOS.DoScreenshot();
		}
	}
	
	if (IsMobileTest())
	{
		if (AppiumDriver.d)
		{
			AppiumDriver.Quit();
		}
	}
}

function TestInit()
{
	var status = CheckConfig();
	if (!status)
	{
		Tester.FailTest("Parameters are missing in Config.json")
	}
}

function IsMobileTest()
{
	return (typeof(AppiumDriver) != "undefined" && AppiumDriver);
}

function GetAppiumNonProfileCapabilities(profile)
{
	var caps = {};
	
	// set capabilities based on a profile name
	if (profile == "Crate iOS SeeTest")
	{
		var _deviceQuery = "";
		if (typeof(DeviceQuery) != "undefined")
		{
			_deviceQuery = DeviceQuery;
			if (!g_recording)
			{
				Tester.Message("Device Query set by parallel runner: " + _deviceQuery);
			}
		}
		else
		{
			_deviceQuery = Global.GetProperty("DeviceQuery", "@os='ios' and @version='13.3' and @category='PHONE'", "%ARTIFACTS%/Device.json");
			if (!g_recording)
			{
				Tester.Message("Device Query set by Device.json: " + _deviceQuery);
			}
		}
	
		caps["deviceQuery"] = _deviceQuery;
		caps["accessKey"] = Global.GetProperty("AccessKey", "", "%ARTIFACTS%/Config.json");
		if (typeof(g_mobileTestName) != "undefined")
		{
			caps["testName"] = g_mobileTestName;
		}
	}
	else if (profile == "Crate iOS Browserstack")
	{
		caps["app"] = Global.GetProperty("BrowserStackApp", "", "%ARTIFACTS%/Config.json");	
		caps["browserstack.user"] = Global.GetProperty("BrowserStackUser", "", "%ARTIFACTS%/Config.json");
		caps["browserstack.key"] = Global.GetProperty("BrowserStackKey", "", "%ARTIFACTS%/Config.json");
		if (typeof(OsVersion) != "undefined")
		{
			caps["os_version"] = OsVersion;
		}
	}
	
	return caps;
}

function CheckConfig()
{
	var result = true;
	var accessKey = Global.GetProperty("AccessKey", "", "%ARTIFACTS%/Config.json");
	if (!accessKey)
	{
		Tester.Message("SeeTest AccessKey is not set in Config.json");
		result = false;
	}
	
	var apiUrl = Global.GetProperty("ApiURL", "", "%ARTIFACTS%/Config.json");
	if (!apiUrl)
	{
		Tester.Message("Crate API URL is not set in Config.json");
		result = false;
	}
	
	var webUrl = Global.GetProperty("WebURL", "", "%ARTIFACTS%/Config.json");
	if (!webUrl)
	{
		Tester.Message("Crate WEB URL is not set in Config.json");
		result = false;
	}
	return result;
}

function CreateUser(/**string*/ user_name, /**string*/ user_email, /**string*/ user_password)
{
	var CrateApi_Signup = SeS('CrateApi_Signup');
	CrateApi_Signup.SetParameters('user_name', user_name);
	CrateApi_Signup.SetParameters('user_email', user_email);
	CrateApi_Signup.SetParameters('user_password', user_password);
	CrateApi_Signup.SetRequestHeaders([{"Name":"Content-Type","Value":"application/json"}]);
	CrateApi_Signup.DoExecute();
	var response = CrateApi_Signup.GetResponseBodyObject();
	var isCreated = typeof(response.errors) == "undefined";
	var id = isCreated ? response.data.userSignup.id : "n/a";
	Tester.Assert("Created user " + user_name + " with id " + id, isCreated);
}

function DeleteUser(/**string*/ user_email, /**string*/ user_password)
{
	var user = LoginUser(user_email, user_password);
	if (!user)
	{
		Tester.Message("User login failed: " + user_email);
		return;
	}
	
	// unsubscribe
	var CrateApi_SubscriptionsByUser = SeS('CrateApi_SubscriptionsByUser');
	CrateApi_SubscriptionsByUser.DoExecute();
	var subscriptions = CrateApi_SubscriptionsByUser.GetResponseBodyObject("data.subscriptionsByUser");
	for(var j = 0; j < subscriptions.length; j++)
	{
		var s = subscriptions[j];
		Tester.Message("Deleting subscription: " + s.crate.name);
		var CrateApi_SubscriptionRemove = SeS('CrateApi_SubscriptionRemove');
		CrateApi_SubscriptionRemove.SetParameters("subscription_id", s.id);
		CrateApi_SubscriptionRemove.DoExecute();
		var response = CrateApi_SubscriptionRemove.GetResponseBodyObject();
		if (response.errors)
		{
			Tester.Message(response.errors[0]);
		}
	}
		
	// delete
	var CrateApi_DeleteUser = SeS('CrateApi_DeleteUser');
	CrateApi_DeleteUser.SetParameters("user_id", user.id);
	var result = CrateApi_DeleteUser.DoExecute();
	var response = CrateApi_DeleteUser.GetResponseBodyObject();
	var isDeleted = typeof(response.errors) == "undefined";
	
	Tester.Assert("User deleted succesfully: " + user.name, isDeleted);
}

function LoginUser(/**string*/ user_email, /**string*/ user_password)
{
	var CrateApi_Login = SeS('CrateApi_Login');
	CrateApi_Login.SetParameters("user_email", user_email);
	CrateApi_Login.SetParameters("user_password", user_password);
	CrateApi_Login.DoExecute();
	var response = CrateApi_Login.GetResponseBodyObject();
	var isLogged = typeof(response.errors) == "undefined";
	if (isLogged)
	{
		Tester.Message("User " + response.data.userLogin.user.name + " logged in");
		return response.data.userLogin.user;
	}
	return null;
}

function SubscribeCrate(crate_id)
{
	var CrateApi_SubscriptionCreate=SeS('CrateApi_SubscriptionCreate');
	CrateApi_SubscriptionCreate.SetParameter("crate_id", "1");
	CrateApi_SubscriptionCreate.DoExecute();
	var response = CrateApi_SubscriptionCreate.GetResponseBodyObject();
	var subscribed = typeof(response.errors) == "undefined";
	if (subscribed)
	{
		Tester.Message("Subscription created " + response.data.subscriptionCreate.id);
	}
}

var auth_token;

/** REST After Callback After_CrateApi_Login*/
function After_CrateApi_Login(/**RESTResponse*/response)
{
	Log('After_CrateApi_Login');
	auth_token = response.GetResponseBodyObject("data.userLogin.token");
	Log("Token: " + auth_token);
}

/** REST Before Callback Before_CrateApi_SubscriptionRemove*/
function Before_CrateApi_SubscriptionRemove(/**RESTRequest*/request)
{
	Log('Before_CrateApi_SubscriptionRemove');
	SetBearerToken(request);
}

/** REST Before Callback Before_CrateApi_SubscriptionsByUser*/
function Before_CrateApi_SubscriptionsByUser(/**RESTRequest*/request)
{
	Log('Before_CrateApi_SubscriptionsByUser');
	SetBearerToken(request);
}

/** REST Before Callback Before_CrateApi*/
function Before_CrateApi(/**RESTRequest*/request)
{
	Log('Before_CrateApi');
	SetApiUrl(request);
}

function SetBearerToken(request)
{
	request.SetHeader('Authorization', 'Bearer ' + auth_token);
}

function SetApiUrl(request)
{
	var url = Global.GetProperty("ApiURL", "", "%ARTIFACTS%/Config.json");
	request.SetUrl(url);
}
