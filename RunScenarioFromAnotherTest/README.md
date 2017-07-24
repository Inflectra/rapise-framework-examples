## RunScenarioFromAnotherTest

Learn how to call a scenario from another test. This may be useful when some common logic is implemented in one test and shared with many others.

### Make Code from Another Test Visible in Current Test

For this purpose `Master.user.js` contains a line

```javascript
eval(g_helper.Include('./CommonScenarios/CommonScenarios.user.js'));
```

It loads code from `CommonScenarios.user.js` into context of the current test. 

### Load Objects from Another Test Visible in Current Test

To make objects from another test visible in current context load them like this in `MasterTest.js`:

```javascript
Global.DoLoadObjects('./CommonScenarios/CommonScenarios.objects.js');
```

### Run Scenarios from Another Test

In `MasterTest.js` you can now write:

```javascript
Login("diana", "pd1");
```

You can also call this scenario in RVL (see `MasterTest.rvl.xlsx`).
