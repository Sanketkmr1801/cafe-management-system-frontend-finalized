import { Order } from './order';
import { MenuItem } from './menu-item';

export class OrderItem {
  OrderItemID: number;
  OrderID: number;
  Order: Order;
  MenuItemID: number;
  MenuItem: MenuItem;
  Quantity: number;
  Price: number;
}
