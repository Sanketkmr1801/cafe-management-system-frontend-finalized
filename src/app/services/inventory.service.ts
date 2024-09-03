import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'https://localhost:5001/api/inventory';

  constructor(private http: HttpClient) {}

  getInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiUrl);
  }

  getInventory(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiUrl}/${id}`);
  }

  addInventory(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.apiUrl, inventory);
  }

  updateInventory(id: number, inventory: Inventory): Observable<void> {
    inventory.InventoryID = id
    return this.http.put<void>(`${this.apiUrl}/${id}`, inventory);
  }

  deleteInventory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
