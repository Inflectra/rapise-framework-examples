## InvokeAnotherTest

This example shows how to run another test from current test. Besides this you will learn how to pass parameters to another test and make them visible both in JavaScript and RVL context.

### Call Login from Master Test

Use `Global.DoInvokeTest` to execute another test. First parameter is a path to the test to invoke, second is a map that contains parameters.

```javascript
function Test()
{
    Global.DoInvokeTest('./Login/Login.sstest', 
        { emailUserId: "diana@contoso.com", password: "pd1" });
}
```

### Inside Login Test

To get access to passed parameters define `Test` function as follows:

```javascript
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
```

Login scenario outputs parameter values into report:

```javascript
Login = function(/**string*/ userName, /**string*/ password)
{
    Tester.Assert("Login scenario", true, 
        [new SeSReportText(userName), new SeSReportText(password) ]);
}
```

Define it using 

```javascript
funcname = function (...) { ... }
```

syntax to make visible in RVL context. If you are working with JavaScript only you can use more traditional way 

```javascript
function funcname (...) { ... }
```

