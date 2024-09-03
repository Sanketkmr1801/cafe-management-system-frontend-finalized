import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../../services/menu-item.service';
import { MenuItem } from '../../models/menu-item';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(
    private menuItemService: MenuItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.menuItemService.getMenuItems().subscribe((data: MenuItem[]) => {
      this.menuItems = data;
    });
  }

  addMenuItem(): void {
    this.router.navigate(['/menu-item/add']);
  }

  editMenuItem(menuItem: MenuItem): void {
    this.router.navigate(['/menu-item/edit', menuItem.MenuItemID]);
  }

  deleteMenuItem(id: number): void {
    if (confirm('Are you sure you want to delete this menu item?')) {
      this.menuItemService.deleteMenuItem(id).subscribe(() => this.loadMenuItems());
    }
  }
}
