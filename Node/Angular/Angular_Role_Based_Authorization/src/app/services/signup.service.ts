import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  endpoint: string = 'https://localhost:7181/services';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, public router: Router) {}

  getRoles() : Observable<any>{
    let api = `${this.endpoint}/getroles`;
    return this.http.get( api, {headers: this.headers}).pipe(
      map((res) => {
        return res || [];
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
