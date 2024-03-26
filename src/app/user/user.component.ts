import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { UserListService } from '../shared/firebase-services/user-list.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIcon, 
    MatButtonModule, 
    MatTooltipModule, 
    MatDialogModule,
    MatCardModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user = new User();
  userList: any = [];

  constructor(public dialog: MatDialog, public userService: UserListService,) {}
  
  ngOnInit(): void {
    this.userService.userList;
  }

  openDialog(): void {
    this.dialog.open(DialogAddUserComponent, {});
  }
}
