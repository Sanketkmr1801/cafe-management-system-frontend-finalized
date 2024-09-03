import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:5001/api/user'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Get a single user by ID
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Add a new user
  addUser(user: User): Observable<User> {
    console.log(user)
    return this.http.post<User>(this.apiUrl, user);
  }

  // Update an existing user
  updateUser(id: number, user: User): Observable<void> {
    user.UserID = id
    return this.http.put<void>(`${this.apiUrl}/${id}`, user);
  }

  // Delete a user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Register a new user
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/Register`, user);
  }

  // Login user
  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Login`, user);
  }

  // Save JWT token to local storage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Get JWT token from local storage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Log out the user
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Get HTTP headers with the JWT token
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

}
