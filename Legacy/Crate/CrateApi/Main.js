//Use 'Record/Learn' button to begin test recording

function Test(params)
{
	if (!params)
	{
		//params = {DeleteUser: "robin@crate.com", UserPassword: "123456"};
		//params = {CreateUser: "Robin", UserEmail: "robin@crate.com", UserPassword: "123456"};
		//params = {LoginUser: "robin@crate.com", UserPassword: "123456"};
	}
	
	if (params)
	{
		if (params.DeleteUser)
		{
			DeleteUser(params.DeleteUser, params.UserPassword);
		}
		else if (params.CreateUser)
		{
			CreateUser(params.CreateUser, params.UserEmail, params.UserPassword);
		}
		else if (params.LoginUser)
		{
			LoginUser(params.LoginUser, params.UserPassword);
		}
		else if (params.SubscribeCrate)
		{
			SubscribeCrate(params.SubscribeCrate);
		}
	}
}

g_load_libraries = ["Web Service"];

