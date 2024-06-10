
/**
 * @PageObject LISRest description
 */
SeSPageObject("LISRest");

var session_token = null;

/**
 * Login to a Session
 * @param {String} inputParam parameter description
 */
function LISRest_Login()
{
	var LISRest_Login=SeS('LISRest_Login');
	LISRest_Login.DoExecute();

	session_token = LISRest_Login.GetResponseBodyObject("");
	Session.SetParameter('session_id', session_token);
	return true;
}

/**
 * Login to a Session
 * @param {String} inputParam parameter description
 */
function LISRest_GetBooksCount()
{
	if(!session_token) 
	{
		LISRest.Login();
	}
	
	var LISRest_GetBooksCount=SeS('LISRest_GetBooksCount');
	LISRest_GetBooksCount.DoExecute();

	var len = LISRest_GetBooksCount.GetResponseBodyObject("length");
	Tester.Message("Books count: "+len);
	return len;
}

