import { Injectable } from '@angular/core'
import {  CanActivate,  ActivatedRouteSnapshot,  RouterStateSnapshot,  Router} from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    //get localstorage user logged in data
    let logged = localStorage.getItem('loggedin')

    //check login
    if (logged === "loggedin")
      return true
    
    //if login fails navigate to login
    this.router.navigate(["/"]);
    return false
  }
}
