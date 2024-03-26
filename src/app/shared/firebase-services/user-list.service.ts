import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  limit,
  orderBy,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.class';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  firestore: Firestore = inject(Firestore);
  userList: any = [];

  unsubList;
  unsubSingle;

  constructor() {
    this.unsubList = onSnapshot(this.getUsersRef(), (list) => {
      list.forEach((element) => {
        this.userList.push(element.data());
      });
    });

    this.unsubSingle = onSnapshot(this.getSingleDocRef('users', 'xx'), (element) => { 

    });
  }
  
  getUser(){
    this.unsubList = onSnapshot(this.getUsersRef(), (list) => {
      list.forEach((element) => {
        this.userList.push(element.data());
      });
    });
  }

  ngonDestroy() {
    this.unsubList();
    this.unsubSingle();
  }

  async addUser(item: User) {
    await addDoc(this.getUsersRef(), item.toJSON())
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef?.id);
      });
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
