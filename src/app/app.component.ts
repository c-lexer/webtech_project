import { Component } from '@angular/core';
import { StorageService } from './_services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private role: string = '';
  isLoggedIn = false;
  isAdmin = false;
  username?: string;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.role = user.role;
      this.isAdmin = this.role.includes('admin');
      this.username = user.user;
    }
  }

  logout(): void {
    this.storageService.clean();

    window.location.reload();
  }
}
