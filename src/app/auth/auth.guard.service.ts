
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from './signin.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(public auth: SignInService, private router: Router) {}
  
  canActivate(): boolean {
    console.log('entra al auth');  
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/inicio']);
      return false;
    }
    console.log('entra al auth2');  
    return true;
  }
}