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

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  firestore: Firestore = inject(Firestore);
  constructor() { }


  // Insert-Funktion

  async addUser(){
    console.log('klappt');    
  }

  // async addUser(item: User, colId: 'notes' | 'trash') {
  //   let collection =
  //     colId === 'trash' ? this.getTrashRef() : this.getNotesRef();

  //   await addDoc(collection, item)
  //     .catch((err) => {
  //       console.error(err);
  //     })
  //     .then((docRef) => {
  //       console.log('Document written with ID: ', docRef?.id);
  //     });
  // }

}