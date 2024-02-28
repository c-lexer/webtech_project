import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_dataobjects/user';
import { StorageService } from '../_services/storage.service';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css'],
})
export class BoardUserComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private storageService: StorageService
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService
      .getUser(this.storageService.getUser().user)
      .subscribe((user) => {
        this.user = user;
      });
  }

  modifyFunds(): void {
    if (this.user) {
      this.userService.updateUser(this.user).subscribe((user: User) => {
        console.log(user);
        this.user = user;
      });
    }
  }

  deleteUser(): void {
    if (this.user && confirm('Are you sure you want to delete your account?')) {
      this.userService.deleteUser(this.user).subscribe((user: User) => {
        this.storageService.clean();
        window.location.reload();
      });
    }
  }
}
