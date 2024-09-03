export class Inventory {
    InventoryID: number;
    ItemName: string;
    Quantity: number;
    UnitPrice: number;
  
    get TotalValue(): number {
      return this.Quantity * this.UnitPrice;
    }
  }
  