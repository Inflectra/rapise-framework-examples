
//########## Script Steps ##############

function Test(params)
{
	if (typeof(params) == "undefined")
	{
		params = { emailUserId: "john@contoso.com", password: "pwd" };
	}


	// Direct call
	Login(params.emailUserId, params.password);
	
	// RVL
	emailUserId = params.emailUserId;
	password = params.password;
	RVL.DoPlayScript("./Login/Login.rvl.xlsx");
}

