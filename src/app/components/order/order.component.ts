import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  selectedOrder: Order;
  isModalOpen = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
      // for(let o of this.orders) {
      //   console.log(o)
      // }
    });
  }

  showDetails(order: Order): void {
    this.selectedOrder = order;
    console.log(this.selectedOrder)
    this.isModalOpen = true;
  }

  closeDetails(): void {
    this.isModalOpen = false;
    this.selectedOrder = undefined;
  }

  editOrder(order: Order): void {
  }

  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(id).subscribe(() => this.loadOrders());
    }
  }
}
