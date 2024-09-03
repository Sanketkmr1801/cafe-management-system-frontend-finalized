import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuItemService } from '../../services/menu-item.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  selector: 'app-menu-item-edit',
  templateUrl: './menu-item-edit.component.html',
})
export class MenuItemEditComponent implements OnInit {
  menuItemForm: FormGroup;
  menuItemId: number = 0;

  constructor(
    private fb: FormBuilder,
    private menuItemService: MenuItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.menuItemForm = this.fb.group({
      name: [''],
      price: [0],
    });
  }

  ngOnInit(): void {
    this.menuItemId = Number(this.route.snapshot.paramMap.get('id'));
    this.menuItemService.getMenuItem(this.menuItemId).subscribe(menuItem => {
      this.menuItemForm.patchValue(menuItem);
    });
  }

  onSubmit(): void {
    this.menuItemService.updateMenuItem(this.menuItemId, this.menuItemForm.value).subscribe(() => {
      this.router.navigate(['/menu-items']);
    });
  }
}
