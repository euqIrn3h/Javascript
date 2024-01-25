import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const helper = new JwtHelperService()
    const token = localStorage.getItem('access_token') as string;
    const tokenRoles = helper.decodeToken(token).Role;
    

    if(helper.isTokenExpired(token)){
      window.alert("Session Expired!");
      this.router.navigate(['log-in'])
      return false;
    }

    if(typeof(tokenRoles) === 'string'){
        if(tokenRoles === "Admin"){
          return true;
        }
        window.alert("Unauthorized!");
    }else{
        for(let i=0; i< tokenRoles.length; i++){
            if(tokenRoles[i] === "Admin"){
              return true;
            }
        }
        window.alert("Unauthorized!");
    }
    
    return false;
  }
}