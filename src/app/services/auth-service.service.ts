import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:5001/api/User/Login'; // Update with your API URL
  private tokenKey = 'authToken';
  private usernameKey = 'username';
  constructor(private http: HttpClient, private router: Router) {}

  login(userName: string, password: string) {
    const User = { 
      UserName: userName,
      PasswordHash: password,
      UserID: 0,
      LastOrderPrice: 0,
      Email: "dummy@gmail.com"
    };
  
    return this.http.post<{ token: string, User: any }>(`${this.apiUrl}`, User).pipe(
      tap(response => {
        console.log('Login response:', response);
        localStorage.setItem(this.tokenKey, response.token);
        // Store the entire user object (excluding passwordHash)
        localStorage.setItem('user', JSON.stringify({
          UserName: response.User.UserName,
          UserID: response.User.UserID,
          LastOrderPrice: response.User.LastOrderPrice,
          Email: response.User.Email
        }));
        this.router.navigate(['/protected']); // Redirect after login
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error); // Forward the error to be handled by the component
      })
    );
  }
  

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user'); // Remove user data
    this.router.navigate(['/login']); // Redirect after logout
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUser(): any {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
  
  getUserName(): string {
    if(this.getUser()) {
    return this.getUser().UserName || ""
    } else {
      return "";
    }
  }

  getUserId(): number {
    return this.getUser()?.UserID || 0;
  }
}
