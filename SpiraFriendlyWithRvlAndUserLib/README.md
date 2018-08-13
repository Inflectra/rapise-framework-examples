# Sample Spira-Friendly Framework with Multiple RVLs and Common Library

This framework uses several concepts of Rapise intended to simplify framework development and design.

By following the suggested design you should get the following benefits:

* Common functionality shared among all tests in the framework
* Easy sharing objects between subtests
* TestPrepare tab for operations performed before any of the tests is executed
* TestFinish tab for functionality finalizing each of the tests
* Ability to work with each subtest separately
* Easy way to execute any piece of any subtest or RVL sheet from each the master test

Before diving deeper into details, let's explain application and test design.

Let's elaborate these features one-by-one.

## Common Functionality 