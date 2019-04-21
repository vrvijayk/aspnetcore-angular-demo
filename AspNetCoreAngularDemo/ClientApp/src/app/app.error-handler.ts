import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
  handleError(error) {
    //Global error handler will fire if error is not handled
    alert("AppErrorHandler: Error occured");
    console.log(error);
    throw error;
  }
}
