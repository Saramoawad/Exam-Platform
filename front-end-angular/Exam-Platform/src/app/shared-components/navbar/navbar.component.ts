import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('isLoggedIn:', this.isLoggedIn);
    console.log('getUserRole:', this.getUserRole);
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get getUserRole(): any {
    return this.authService.getUserRole();
  }


  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
