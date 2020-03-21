import { Injectable } from '@angular/core';
import { LRLocation } from '../model/base';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  public getPlaces(): any {
    return this.db.collection('locations').valueChanges();
  }
}
