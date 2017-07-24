
//########## Script Steps ##############

function Test(params)
{
	if (!params)
	{
		// default values for parameters if Login is executed directly
		params = { emailUserId: "john@contoso.com", password: "pwd" };
	}

	// Call Login scenario defined in Login.user.js
	Login(params.emailUserId, params.password);
	
	// Call RVL script
	emailUserId = params.emailUserId;
	password = params.password;
	RVL.DoPlayScript("./Login/Login.rvl.xlsx");
}

