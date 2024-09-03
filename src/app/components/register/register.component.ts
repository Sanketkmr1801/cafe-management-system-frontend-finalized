import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();

  constructor(private userService: UserService, private router: Router) {}

  register(): void {
    this.userService.addUser(this.user).subscribe(
      (response) => {
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Registration failed.');
      }
    );
  }
}
