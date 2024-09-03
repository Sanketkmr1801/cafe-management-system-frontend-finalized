import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Load all users from the server
  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      error => {
        console.error('Error loading users', error);
      }
    );
  }

  // Navigate to user add/edit form
  addUser(): void {
    this.router.navigate(['/user/add']); // Adjust the route as needed
  }

  // Navigate to user edit form
  editUser(user: User): void {
    this.router.navigate([`/user/edit/${user.UserID}`]); // Adjust the route as needed
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.users = this.users.filter(user => user.UserID !== id);
        },
        error => {
          console.error('Error deleting user', error);
        }
      );
    }
  }
}
