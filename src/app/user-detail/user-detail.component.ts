import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { UserListService } from '../shared/firebase-services/user-list.service';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userID: any = '';
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    public userService: UserListService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.userID = paramMap.get('id');
      this.userService.getSingleUserData(this.userID, () => {
        this.user = new User(this.userService.user);
      });
    });
  }

  ngOnDestroy() {    
    this.userService.unsubscribeSingleUserData();
  }

  editMenu(){
    const dialog = this.dialog.open(DialogEditAddressComponent, {});
    dialog.componentInstance.user = this.user;
  }
  editUserDetail(){
    const dialog = this.dialog.open(DialogEditUserComponent, {});
    dialog.componentInstance.user = this.user;
  }

}
