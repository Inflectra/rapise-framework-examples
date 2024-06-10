/**
 *	This User.js is shared between all test scenarios. 
 */

if(!g_recording)
{
  TestPrepare = function() 
  {
  
  	// This 'TestPrepare' will be executed for all test scenarios
  	// So here we set common configuration file to be used.
    Global.SetConfigPath("%WORKDIR%\\Config.xlsx")
  
  }
}