import { OrderItem } from './order-item';

export class Order {
  OrderID: number;
  OrderDate: Date;
  TotalAmount: number;
  UserID: number | null;
  OrderItems: OrderItem[];
}