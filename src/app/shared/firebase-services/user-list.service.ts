import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  onSnapshot,
  addDoc,
  getDoc,
  Unsubscribe,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.class';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  firestore: Firestore = inject(Firestore);

  userList: any = [];
  singleUserData: any = [];

  unsubNotes;  
  private singleUserUnsubscribe: Unsubscribe | undefined;

  constructor() {
    this.unsubNotes = this.subNotesList();
  }

  subNotesList() {
    return onSnapshot(this.getUsersRef(), (list) => {
      this.userList = [];
      list.forEach((element) => {
        this.userList.push(this.setNoteObject(element.data(), element.id));
      });
    });
  }
  
  unsubscribeSingleUserData() {
    if (this.singleUserUnsubscribe) {
      this.singleUserUnsubscribe();
    }
  }
  
  getSingleUserData(docId: string) {
    this.singleUserData = [];
    this.singleUserUnsubscribe = onSnapshot(
      this.getSingleDocRef('users', docId),
      (element) => {        
        this.singleUserData.push(this.setNoteObject(element.data(), element.id));
      }
    );
  }
  
  setNoteObject(obj: any, id: string): any {
    return {
      id: id,
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      birthDate: obj.birthDate,
      street: obj.street,
      zipCode: obj.zipCode,
      city: obj.city,
    };
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  ngonDestroyy() {
    this.unsubNotes();
    this.singleUserData;
  }
  // constructor() {
  //   this.unsubList = onSnapshot(this.getUsersRef(), (list) => {
  //     list.forEach((element) => {
  //       this.userList.push(this.setUserObject(element.data(), element.id));
  //     });
  //   });

  //   this.unsubSingle = onSnapshot(this.getUsersRef(), (list) => {
  //     list.forEach((element) => {
  //       this.userList.push(this.setUserObject(element.data(), element.id));
  //     });
  //   });

  // }

  // getUser() {
  //   onSnapshot(this.getUsersRef(), (list) => {
  //     list.forEach((element) => {
  //       this.userList.push(this.setUserObject(element.data(), element.id));
  //     });
  //   });
  // }

  // async getUserData(docId: string) {
  //   const docRef = doc(this.getUsersRef(), docId);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     // console.log('Document data:', docSnap.data());
  //     //this.singleUserData.push(docSnap.data());
  //     this.singleUserData.push(this.setUserObject(docSnap.data(), docId))
  //   } else {
  //     console.log('No such document!');
  //   }
  // }

  async addUser(item: User) {
    await addDoc(this.getUsersRef(), item.toJSON())
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef?.id);
      });
  }
}
