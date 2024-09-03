import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuItemService } from '../../services/menu-item.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  selector: 'app-menu-item-add',
  templateUrl: './menu-item-add.component.html',
})
export class MenuItemAddComponent {
  menuItemForm: FormGroup;

  constructor(private fb: FormBuilder, private menuItemService: MenuItemService, private router: Router) {
    this.menuItemForm = this.fb.group({
      name: [''],
      price: [0],
    });
  }

  onSubmit(): void {
    this.menuItemService.addMenuItem(this.menuItemForm.value).subscribe(() => {
      this.router.navigate(["/menu-items"])
    });
  }
}
