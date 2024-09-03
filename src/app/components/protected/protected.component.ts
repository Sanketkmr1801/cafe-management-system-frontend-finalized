import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {
  userName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      // Redirect to login if not authenticated
      window.location.href = '/login'; // Update with your login route
      return;
    }

    this.userName = this.authService.getUserName();
    // Force refresh of the current route
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }

  logout(): void {
    this.authService.logout();
  }
}
