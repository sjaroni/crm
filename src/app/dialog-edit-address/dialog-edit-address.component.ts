import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { UserListService } from '../shared/firebase-services/user-list.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDatepicker,
    FormsModule,
    MatProgressBarModule,
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent{
  user: User | undefined;
  loading: boolean = false;
  userID: string = '';

  constructor(
    private userService: UserListService,
    public dialogRef: MatDialogRef<DialogEditAddressComponent>
  ) {}

  saveUser() {
    if(this.user){
      this.loading = true;
      this.userService.updateUser(this.userID, this.user);
      this.loading = false;
      this.closeDialog();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
