
//########## Script Steps ##############

function Test(params)
{
// 1. Check if patient exists
// 2. If it does not - add a patient with unique name
// 3. If two instances exist - add incident to spira about inconsistent data in system
// 4. Try adding patient
// 5. Check that patient merge warning is displayed.

	params = params||{};
	g_restRoot = "%WORKDIR%/EnsureSingleUser";


	var enc = Base64.encode('admin:Admin123');
	Tester.Message(enc);

	var firstName = params.firstName || Global.GetProperty('uniquepatientfirst');
	var lastName = params.lastName || Global.GetProperty('uniquepatientlast');
	var age = params.age || Global.GetProperty('uniquepatientage');
	
	Session.SetRequestHeader({"Name":"Content-Type","Value":"application/json"});

	var OpenMRS_session=SeS('OpenMRS_session');
	OpenMRS_session.SetRequestHeaders(
		[
			{"Name":"Authorization","Value":"Basic "+enc}
		]
	);
	OpenMRS_session.DoExecute();
	

	var OpenMRS_findpatient=SeS('OpenMRS_findpatient');
	OpenMRS_findpatient.SetParameters('PersonName', firstName+' '+lastName);
	OpenMRS_findpatient.DoExecute();

	var foundPatients = OpenMRS_findpatient.GetResponseBodyObject("results.length");
	
	if(foundPatients==0)
	{
		var OpenMRS_addperson=SeS('OpenMRS_addperson');
		OpenMRS_addperson.SetRequestBodyObject(
		{
		  "names": [
		    {
		      "givenName": firstName,
		      "familyName": lastName
		    }
		  ],
		  "gender": "M",
		  "age": age
		}
		)
		OpenMRS_addperson.DoExecute();
		var personId = OpenMRS_addperson.GetResponseBodyObject("uuid")
		
		var OpenMRS_patientidentifiertype=SeS('OpenMRS_patientidentifiertype');
		OpenMRS_patientidentifiertype.DoExecute();
		var patiendOpenId = OpenMRS_patientidentifiertype.GetResponseBodyObject("results[0].uuid");
		
		var OpenMRS_location=SeS('OpenMRS_location');
		OpenMRS_location.DoExecute();
		var locationId = OpenMRS_location.GetResponseBodyObject("results[6].uuid");
		
		var OpenMRS_genidentifier=SeS('OpenMRS_genidentifier');
		OpenMRS_genidentifier.DoExecute();
		var patientOpenId = OpenMRS_genidentifier.GetResponseBodyObject("identifiers[0]");
	
		var OpenMRS_patient=SeS('OpenMRS_patient');
		
		OpenMRS_patient.SetRequestBodyObject(
			{
			  "identifiers": [
			    {
			      "identifier": patientOpenId,
			      "identifierType": "05a29f94-c0ed-11e2-94be-8c13b969e334",
			      "location": locationId,
			      "preferred": true
			    }
			  ],
			  "person": personId
			}
		);
		OpenMRS_patient.DoExecute();
	
		var patientId = OpenMRS_patient.GetResponseBodyObject("uuid");
		
		Global.SetProperty('MergePatientId', patientOpenId);

	} else if(foundPatients==1) {
		Tester.Assert('Exactly one person found, ready for merge test', true);
		var patientOpenId = OpenMRS_findpatient.GetResponseBodyObject("results[0].identifiers[0].identifier");
		Global.SetProperty('MergePatientId', patientOpenId);

	} else {
		var incInfo = 'More than one patients already exist: '+ firstName+' '+lastName;
		var incData = JSON.stringify(OpenMRS_findpatient.GetResponseBodyObject("results"), null, '\t')
		
		Global.DoInvokeTest('%WORKDIR%/LogSpiraIncident/LogSpiraIncident.sstest',
			{
				name: incInfo,
				description: 'Found users:<br/><pre>'+ incData+"</pre>"
			}
		);
		
		Tester.Assert(incInfo, false, incData);
	
	}

}

g_load_libraries=["Web Service"];



