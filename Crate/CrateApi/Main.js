//Use 'Record/Learn' button to begin test recording

function Test(params)
{
	if (!params)
	{
		//params = {DeleteUser: "Robin"};
		//params = {CreateUser: "Robin", UserEmail: "robin@crate.com", UserPassword: "123456"};
	}
	
	if (params)
	{
		if (params.DeleteUser)
		{
			DeleteUser(params.DeleteUser);
		}
		else if (params.CreateUser)
		{
			CreateUser(params.CreateUser, params.UserEmail, params.UserPassword);
		}
	}
}

g_load_libraries = ["Web Service"];

