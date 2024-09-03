import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  private apiUrl = 'https://localhost:5001/api/MenuItem';

  constructor(private http: HttpClient) {}

  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.apiUrl);
  }

  getMenuItem(id: number): Observable<MenuItem> {
    return this.http.get<MenuItem>(`${this.apiUrl}/${id}`);
  }

  addMenuItem(menuItem: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(this.apiUrl, menuItem);
  }

  updateMenuItem(id: number, menuItem: MenuItem): Observable<void> {
    menuItem.MenuItemID = id
    return this.http.put<void>(`${this.apiUrl}/${id}`, menuItem);
  }

  deleteMenuItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
