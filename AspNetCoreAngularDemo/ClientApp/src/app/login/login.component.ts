import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin(user) {
    this.auth.login(user).subscribe(
      data => {
        console.log(data);
        if (this.auth.redirectUrl) {
          return this.router.navigate([this.auth.redirectUrl]);
        }
        this.router.navigate(["/products"]);
      },
      error => {
        alert(error.error);
      }
    );
  }
}
