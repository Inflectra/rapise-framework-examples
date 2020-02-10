![Download](https://github.githubassets.com/images/icons/emoji/unicode/23ec.png?v8) [Download Now](https://inflectra.github.io/DownGit/#/home?url=https://github.com/Inflectra/rapise-framework-examples/tree/master/OpenMRS_DDT)

# OpenMRS_DDT

This is a sample framework for demonstration of Rapise features for data-driven testing. It was created for the webinar series [Planet Test Automation](https://www.inflectra.com/Ideas/Entry/webinar-series-planet-test-automation-first-steps-897.aspx) we created at Inflectra.

## Application Under Test

[OpenMRS](https://openmrs.org/) - is our application under test. You may use the [online demo](https://openmrs.org/demo/) or [download](https://openmrs.org/download/) the standalone edition and simply run it with a click of a mouse. The only prerequisite is to have [Java](https://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html) installed on your machine.

## Components

The framework consists of a parent test and several sub-tests.

### DataSources

Contains examples of reading data from various sources:

- Text File
- CSV File
- XML File
- JSON File
- Excel File
- Database
- RVL Map
- [Generators](https://github.com/Inflectra/rapise-powerpack/tree/master/DataGenerator)

### DataOrigin

Shows how to operate with different kinds of data:

- Fixed (collected in advance)
- Random (generated during test playback)
- Unique (data that must be unique on every test run)
- Sequences (using next value from a sequence on each test run)
- Encrypted

### DataOutput

Demonstrates writing into different types of files:

- Text File
- CSV File
- XML File
- JSON File
- Excel File
- Bitmap File

Also this sub-test shows how to compare spreadsheets and bitmaps.

### Login, Logout

These sub-tests implement login and logout for OpenMRS web application. Login is parameterized and receives username/password from other sub-tests.

### DefaultLogins

It is data-driven scenario that iterates through a table of OpenMRS logins and checks they are valid.

### CheckDashboardTiles

This data-driven scenario uses an Excel spreadsheet to check modules that should be available to different types of users after login.

### RegisterPatient

In this example data for patient registration is generated during playback. It is a demonstration of [DataGenerator](https://github.com/Inflectra/rapise-powerpack/tree/master/DataGenerator).







