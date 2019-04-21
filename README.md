# aspnetcore-angular-demo

* Download or clone project
* Open AspNetCoreAngularDemo.sln in Visual Studio 2017 or greater
* Open appSettings.json - change the connectionstring server
* Open Package manage console - run command - update database - enter    (Packages are restored so it will take time)
* Run the project - (Angular will be started so it will take time. If timeout error occurs, reload the page)
* Click login or Products

# Login Credentials
Administrator 
**username**: admin, **password**: admin

*admin user can create/edit/delete product*

App user 
**username**: user1, **password**: user1

*app user can view and edit product* 


# Troubleshoot Issues
* TimeoutException: The Angular CLI process did not start listening for requests within the timeout period
Reload the page

* if The NPM script 'start' exited without indicating that the Angular CLI was listening for requests.
open command prompt as administrator
navigate to ClientApp in the project folder
npm install (nodejs is required for this command - if not available download nodejs)
