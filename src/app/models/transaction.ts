import { Order } from './order';

export class Transaction {
  transactionID: number;
  orderID: number;
  order: Order;
  transactionDate: Date;
  amount: number;
}
