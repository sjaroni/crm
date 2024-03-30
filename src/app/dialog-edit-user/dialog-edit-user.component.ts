import { Component } from '@angular/core';
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
import { FormControl, FormsModule } from '@angular/forms';
import { UserListService } from '../shared/firebase-services/user-list.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-dialog-edit-user',
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
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  user: User | undefined;
  loading: boolean = false;
  userID: string = '';
  birthDate: Date | undefined;
  
  constructor(
    private userService: UserListService,
    public dialogRef: MatDialogRef<DialogEditUserComponent>,    
  ) {
    
  }

  saveUser() {
    if(this.user){
      this.user.birthDate = this.birthDate!.getTime();
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
