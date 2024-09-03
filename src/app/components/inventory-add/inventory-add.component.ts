import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../models/inventory';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.css']
})
export class InventoryAddComponent {
  inventoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private router: Router
  ) {
    this.inventoryForm = this.fb.group({
      itemName: ['', Validators.required],  
      quantity: [0, Validators.required],
      unitPrice: [0, Validators.required]   
    });
  }

  onSubmit(): void {
    const newInventory: Inventory = this.inventoryForm.value;
    console.log(newInventory);
    this.inventoryService.addInventory(newInventory).subscribe(() => {
      this.router.navigate(['/inventory']);
    }, error => {
      console.error('There was an error!', error);
    });
  }
}
