![Download](https://github.githubassets.com/images/icons/emoji/unicode/23ec.png?v8) [Download Now](https://inflectra.github.io/DownGit/#/home?url=https://github.com/Inflectra/rapise-framework-examples/tree/master/Crate)

# Crate

This is a sample framework for demonstration of Rapise features for Mobile, API and Web testing. 

## Application Under Test

[Crate](https://github.com/atulmy/crate) - is our application under test.

## Prerequisites

Create Config.json file in the root folder of the framework.

```json
{
	"AccessKey": "<SeeTest cloud access key>",
	"WebURL": "<Crate Web URL>",
	"ApiURL": "<Crate API URL>"
}
```

For running tests with SpiraTest/SeeTest create Device.json with `DeviceQuery` and attach to a test set.

```json
{
	"DeviceQuery": "@os='ios' and @version='14.1' and @category='PHONE'"
}
```

## Components

The framework consists of a parent test and several sub-tests.

Test cases are named to reflect their purpose:

TC_\* - test cases,
CrateApi - interaction with Crate GraphQL API,
CrateWeb - interaction with Crate Web UI.

### TC_Signup

Test steps:

1. Delete a given user if exists (API).
2. Register the user in the system and test that the user can login successfully (Mobile, iOS).

![TC_Signup test case](./Media/TC_Signup.png)

### TC_Subscribe

Test steps:

1. Delete a given user if exists (API).
2. Register the user in the system (API).
3. Log into the system, subscribe for a crate (Mobile, iOS).
4. Check subscription (Web UI)
5. Unsubscribe (Mobile, iOS).

RVL
![TC_Subscribe test case](./Media/TC_Subscribe.png)

### TC_MobileTemplate

Mobile test template. Clone to create a new test case.

### CrateApi

Used to call API scenarios (DeleteUser, CreateUser, LoginUser, SubscribeCrate).

Request Definitions
![CrateApi definitions](./Media/RapiseCrateApiEndpoints.png)

Usage
![CrateApi calls](./Media/RapiseCrateApiCalls.png)

### CrateWeb

Used to call Web UI scenario (CheckSubscription).

Scenario
![CrateWeb scenario](./Media/RapiseCrateWebScenario.png)

Usage
![CrateWeb call](./Media/RapiseCrateWebCall.png)




