//Put your custom functions and variables in this file

g_browserLibrary = "Chrome";
g_mobileProfile = "Crate iOS SeeTest";

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
		caps["deviceQuery"] = "@os='ios' and @version='13.3' and @category='PHONE'";
		caps["accessKey"] = Global.GetProperty("AccessKey");
		if (typeof(g_mobileTestName) != "undefined")
		{
			caps["testName"] = g_mobileTestName;
		}
	}
	
	return caps;
}

function CheckConfig()
{
	var result = true;
	var accessKey = Global.GetProperty("AccessKey");
	if (!accessKey)
	{
		Tester.Message("SeeTest AccessKey is not set in Config.json");
		result = false;
	}
	
	var apiUrl = Global.GetProperty("ApiURL");
	if (!apiUrl)
	{
		Tester.Message("Crate API URL is not set in Config.json");
		result = false;
	}
	
	var webUrl = Global.GetProperty("WebURL");
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

function DeleteUser(/**string*/ user_name)
{
	var CrateApi_ListUsers = SeS('CrateApi_ListUsers');
	CrateApi_ListUsers.DoExecute();
	
	var users = CrateApi_ListUsers.GetResponseBodyObject("data.users");
	for(var i = 0; i < users.length; i++)
	{
		var user = users[i];
		Tester.Message(user.name);
		if (user.name == user_name)
		{
			// login
			var CrateApi_Login = SeS('CrateApi_Login');
			CrateApi_Login.SetParameters("user_email", user.email);
			CrateApi_Login.SetParameters("user_password", "123456");
			CrateApi_Login.DoExecute();
		
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
			
			Tester.Assert("User deleted succesfully: " + user_name, isDeleted);
		}
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
	var url = Global.GetProperty("ApiURL");
	request.SetUrl(url);
}
