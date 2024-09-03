// user-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  userId: number = 0;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      userName: [''],
      email: [''],
      passwordHash: [''],
      lastOrderPrice: [0],
    });
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(this.userId).subscribe(user => {
      this.userForm.patchValue(user);
    });
  }

  onSubmit(): void {
    this.userService.updateUser(this.userId, this.userForm.value).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
