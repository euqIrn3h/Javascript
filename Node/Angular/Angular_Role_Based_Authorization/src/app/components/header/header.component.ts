import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})



export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  isAdmin: boolean = false;
  constructor(public authService: AuthService , public router: Router){
    this.isLoggedIn();
    this.isAdminRole();
  }

  ngOnInit(){ 
  }

  isLoggedIn(){
    const helper = new JwtHelperService();
    const token = localStorage.getItem('access_token');
    
    if(token === null || helper.isTokenExpired(token)){
      this.isLogged = false;
      this.router.navigate(['log-in']);
      return 
    }
    this.isLogged = true;
    return
  }

  isAdminRole(){
    const helper = new JwtHelperService()
    const token = localStorage.getItem('access_token') as string;

    if(!token){
      return this.isAdmin = false;
    }

    const tokenRoles = helper.decodeToken(token).Role;

    if(typeof(tokenRoles) === 'string'){
      if(tokenRoles === "Admin"){
        return this.isAdmin = true;
      }
    }else{
        for(let i=0; i< tokenRoles.length; i++){
            if(tokenRoles[i] === "Admin"){
              return this.isAdmin = true;
            }
        }
    }
    return this.isAdmin = false;
  }

  logout() {
    localStorage.removeItem('access_token');
    this.isLoggedIn();
  }
}
