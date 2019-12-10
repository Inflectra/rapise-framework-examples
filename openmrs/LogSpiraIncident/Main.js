
//########## Script Steps ##############

function Test(params)
{
	var url = Global.GetProperty('spiraurl');
	var userName = params.userName || Global.GetProperty('spiralogin');
	var password = params.password || Global.GetProperty('spirapassword');
	var projectId = params.project || Global.GetProperty('spiraprojectid');


	Tester.Message('Params: '+JSON.stringify(params));
	var params = params || {};


	var name = params.name || "Auto Created Incident by Rapise";
	var description = params.description || "incident description tbd";
	
	g_restRoot = "%WORKDIR%/LogSpiraIncident/";

	var Spira=SeS('Spira');
	url = Global.DoTrim(url, false, '/'); // trim trailing '/'
	Spira.SetUrl(url+'/Services/v5_0/SoapService.svc');
	
	Spira.DoExecute('Connection_Authenticate', {"userName":userName,"password":password});
	Spira.DoExecute('Connection_ConnectToProject', {"projectId":projectId,"projectIdSpecified":true});
	
	Spira.DoExecute('Incident_RetrievePriorities', {});
	var priorityId = Spira.GetResponseBodyObject("Body.result[0].PriorityId");	
	
	Spira.DoExecute('Incident_Create', 
	{
	  "remoteIncident": {
	    "Name": name,
	    "Description": description,
	    "PriorityId": priorityId,
	    "PriorityIdSpecified": true
	  }
	}
	);
	Spira.DoExecute('Connection_Disconnect', {});



}

g_load_libraries=["%g_browserLibrary:Firefox HTML%","Web Service"];



