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
import { JsonPipe } from '@angular/common';

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
        this.userList.push(this.setUserObject(element.data(), element.id));
      });
    });

    this.unsubSingle = onSnapshot(
      this.getSingleDocRef('users', 'xx'),
      (element) => {}
    );
  }

  setUserObject(obj: any, id: string): any {
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
