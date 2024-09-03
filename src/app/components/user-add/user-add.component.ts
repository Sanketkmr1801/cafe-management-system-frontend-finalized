// user-add.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
})
export class UserAddComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.userForm = this.fb.group({
      userName: [''],
      email: [''],
      passwordHash: [''],
      lastOrderPrice: [0],
    });

  }

  onSubmit(): void {
    this.userService.addUser(this.userForm.value).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
