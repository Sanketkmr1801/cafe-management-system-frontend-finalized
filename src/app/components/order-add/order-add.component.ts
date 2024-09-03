import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { MenuItemService } from '../../services/menu-item.service';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { MenuItem } from '../../models/menu-item';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';
@Component({
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  orderForm: FormGroup;
  menuItems: MenuItem[] = [];
  selectedItems: { [MenuItemID: number]: { Quantity: number; Price: number } } = {};

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private menuItemService: MenuItemService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.orderForm = this.fb.group({
      userID: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.menuItemService.getMenuItems().subscribe(data => {
      this.menuItems = data;
    });
    this.setUserId();
  }

  onAddItem(MenuItemID: number, event: Event, Price: number): void {
    const input = event.target as HTMLInputElement; // Cast to HTMLInputElement
    const Quantity = +input.value; // Convert the value to a number
    
    if (Quantity > 0) {
      this.selectedItems[MenuItemID] = { Quantity, Price };
    } else {
      delete this.selectedItems[MenuItemID];
    }
  }
  
  

  onSubmit(): void {
    const orderItems: OrderItem[] = Object.keys(this.selectedItems).map(key => {
        const MenuItemID = +key;
        const { Quantity, Price } = this.selectedItems[MenuItemID];
        return {
            OrderItemID: 0,
            OrderID: 0, // This will be set later by the backend
            MenuItemID,
            Quantity,
            Price
        } as OrderItem;
    });

    const order: Order = {
        OrderID: 0, // This will be set later by the backend
        OrderDate: new Date(),
        TotalAmount: orderItems.reduce((sum, item) => sum + item.Quantity * item.Price, 0),
        UserID: this.orderForm.value.userID,
        OrderItems: orderItems
    };
    console.log('Sending Order:', order); // Log the order to verify its contents
    this.orderService.addOrder(order).subscribe(() => {
        this.router.navigate(['/orders']);
    });
    
  }
  private setUserId() {
    const userId = this.authService.getUserId();
    this.orderForm.patchValue({ userID: userId });
  }
}
