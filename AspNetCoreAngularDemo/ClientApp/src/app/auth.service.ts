import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl = null;
  apiUrl = environment.apiUrl + "/auth";

  constructor(private http: HttpClient) {
    this.isLoggedIn = this.getToken() != null;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getUser() {
    const jwtHelper = new JwtHelperService();
    var user = jwtHelper.decodeToken(this.getToken());
    return user;
  }

  isUserInRole(role) {
    var user = this.getUser();
    return user.role.split(",").indexOf(role) != -1;
  }

  login(user) {
    return this.http.post(this.apiUrl, user).pipe(
      map(data => {
        localStorage.setItem("token", data["token"]);
        this.isLoggedIn = true;
        return data;
      })
    );
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem("token");
  }
}
