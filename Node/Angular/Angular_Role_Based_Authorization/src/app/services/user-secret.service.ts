import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserSecretService {

  endpoint: string = 'https://localhost:7181/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router, public authservice: AuthService) { }

  getSecret(): Observable<any> {
    return this.http.get(`${this.endpoint}/secret`, {headers: this.headers}).pipe(
      catchError(this.authservice.handleError)
    );;
  }
}
