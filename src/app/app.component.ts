import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service.service';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cafe-management-system-frontend';
  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.userName = this.authService.getUserName()
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.userName = this.authService.getUserName();
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
