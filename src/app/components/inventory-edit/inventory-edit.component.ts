import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../models/inventory';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  selector: 'app-inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.css']
})
export class InventoryEditComponent implements OnInit {
  inventoryForm!: FormGroup;
  inventoryID!: number;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the inventory ID from the route parameters
    this.inventoryID = Number(this.route.snapshot.paramMap.get('id'));

    // Initialize the form
    this.inventoryForm = this.fb.group({
      itemName: [''],
      quantity: [0],
      unitPrice: [0]
    });

    // Load the inventory data
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventoryService.getInventory(this.inventoryID).subscribe((data: Inventory) => {
      // Patch the form with the inventory data
      this.inventoryForm.patchValue({
        itemName: data.ItemName,
        quantity: data.Quantity,
        unitPrice: data.UnitPrice
      });
    });
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      const updatedInventory: Inventory = {
        inventoryID: this.inventoryID,
        ...this.inventoryForm.value
      };

      this.inventoryService.updateInventory(this.inventoryID, updatedInventory).subscribe(() => {
        this.router.navigate(['/inventory']);
      });
    }
  }
}
