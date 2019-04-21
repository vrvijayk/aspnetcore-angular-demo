# aspnetcore-angular-demo

1. Open AspNetCoreAngularDemo.sln in Visual Studio 2017 or greater
2. Open appSettings.json - change the connectionstring server
3. Open Package manage console - run command - update database - enter    (Packages are restored so it will take time)
4. Run the project - (Angular will be started so it will take time. If timeout error occurs, reload the page)
5. Click login or Products

# Login Credentials
Administrator 
**username**: admin, **password**: admin

*admin user can create/edit/delete product*

App user 
**username**: user1, **password**: user1

*app user can view and edit product* 


# Troubleshoot Issues
1. TimeoutException: The Angular CLI process did not start listening for requests within the timeout period
Reload the page

2. if The NPM script 'start' exited without indicating that the Angular CLI was listening for requests.
open command prompt as administrator
navigate to ClientApp in the project folder
npm install (nodejs is required for this command - if not available download nodejs)
