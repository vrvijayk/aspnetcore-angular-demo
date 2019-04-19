import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthorizeGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log("authorize", next.data["role"]);

    var isAuthorized =
      this.auth.isLoggedIn &&
      next.data["role"] &&
      this.auth.isUserInRole(next.data["role"]);
    if (!isAuthorized) {
      this.router.navigate(["/not-authorized"]);
    }
    return isAuthorized;
  }
}
