import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { UserListService } from '../shared/firebase-services/user-list.service';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userID: any = '';
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    public userService: UserListService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.userID = paramMap.get('id');
      this.userService.getSingleUserData(this.userID);
    });
  }

  ngOnDestroy() {    
    this.userService.unsubscribeSingleUserData();
  }

  openAddressDialog(){
    // new dialog
  }
}
