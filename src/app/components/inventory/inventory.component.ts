import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../models/inventory';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventories: Inventory[] = [];

  constructor(private inventoryService: InventoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadInventories();
  }

  loadInventories(): void {
    this.inventoryService.getInventories().subscribe((data: Inventory[]) => {
      this.inventories = data;
    });
  }

  addInventory(): void {
    this.router.navigate(['/inventory/add']);
  }

  editInventory(inventory: Inventory): void {
    this.router.navigate(['/inventory/edit', inventory.InventoryID]);
  }

  deleteInventory(id: number): void {
    if (confirm('Are you sure you want to delete this inventory item?')) {
      this.inventoryService.deleteInventory(id).subscribe(() => this.loadInventories());
    }
  }
}
