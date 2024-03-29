import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "./_services/authentication.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const { token } = route.queryParams;
        if (token) {
          return true;
        }
        if (localStorage.getItem("currentUser")) {
            // logged in so return true
            this.authService.setLogin(true);
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
        this.authService.setLogin(false);
        return false;
    }
}
