import { UserLogin, UserRegister } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userUrl = 'http://localhost:8000/auth';

  constructor(private http: HttpClient) {}

  login(
    user: UserLogin
  ): Observable<{ status: string; message: { token: string } }> {
    return this.http.post<{ status: string; message: { token: string } }>(
      `${this.userUrl}/login`,
      user
    );
  }

  register(user: UserRegister) {
    return this.http.post(`${this.userUrl}/register`, user);
  }

  logout() {
    localStorage.removeItem('token');
  }

  // !! convert the result to a boolean
  // token exists >> true
  // token not exist >> false
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): any {
    const token = localStorage.getItem('token');
    if (token) {
      // decodes it to a readable json
      const decoded: any = jwtDecode(token);
      return decoded.role || 'student';
    }
    return null;
  }

  getUserId():any {
    const token = localStorage.getItem('token');
    if (token) {
      // decodes it to a readable json
      const decoded: any = jwtDecode(token);
      return decoded.id;
    }
    return null;
  }
}
