import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check if the user is already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/protected']);
    }
  }
  login(): void {
    console.log(`trying to log in with username ${this.username} and password ${this.password}`)
    this.authService.login(this.username, this.password).subscribe(() => {
      this.router.navigate(['/protected']); // Redirect to the home or protected page after login
    }, error => {
      alert('Invalid username or password');
    });
  }
}