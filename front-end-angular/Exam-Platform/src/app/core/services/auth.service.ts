import { UserLogin, UserRegister } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userUrl = 'http://localhost:8000/auth';

  constructor(private http: HttpClient) {}

  login(user: UserLogin):Observable<{status: string, message: {token: string}}> {
    return this.http.post<{status: string, message: {token: string}}>(`${this.userUrl}/login`, user);
  }

  register(user: UserRegister) {
    return this.http.post(`${this.userUrl}/register`, user)
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
