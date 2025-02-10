import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../../shared/constants';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: string): Observable<any>{
    return this.http.post(BACKEND_URL+'/api/auth/register', {name, email, password});
  }

  login(name: string, password: string): Observable<User>{
    return this.http.post<User>(BACKEND_URL+'/api/auth/login', {name, password});
  }

  checkSession(): Observable<any>{
    return this.http.get(BACKEND_URL+'/api/auth/refresh-session');
  }

  logout(): Observable<any>{
    return this.http.post(BACKEND_URL+'/api/auth/logout', {});
  }
}
