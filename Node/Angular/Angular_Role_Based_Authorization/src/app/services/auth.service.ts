import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router} from '@angular/router';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  endpoint: string = 'https://localhost:7181/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient, public router: Router) {}
  // Sign-up
  signUp(user: User): Observable<any> {
    return this.http.post(`${this.endpoint}/register`, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post(`${this.endpoint}/login`, user).pipe(catchError(this.handleError));
  }
  
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      if(error.status == 400){
        window.alert(error.error)
      }
      if(error.status == 401){
        window.alert("Unauthorized!")
      }
      if(error.status == 403){
        window.alert("Forbidden!")
      }   
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}