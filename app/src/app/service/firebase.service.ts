import { Injectable } from '@angular/core';
import { LRLocation, Product, LocationDetail } from "../model/base"
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  public getPlaces(): any {
    return this.db.collection('locations').valueChanges({idField: 'id'});
  }

  /**
   * @param id - id of a location document inside firebase store
   */
  public getPlace(id: string): Observable<LRLocation> {
    return this.db.doc<LRLocation>(`locations/${id}`).valueChanges();
  }

  /**
   * @param id - id of a location document inside firebase store
   */
  public getPlaceDetails(id: string): Observable<LocationDetail[]> {
    return this.db.doc<LRLocation>(`locations/${id}`)
      .collection<LocationDetail>('details').valueChanges();
  }

  /**
   @param id - id of a location document inside firebase store
   */
  public getProductsForPlace(id: string): Observable<Product[]> {
    return this.db.doc(`locations/${id}`)
      .collection<Product>('products').valueChanges({idField: 'id'});
  }

  /**
   * @param locationId - id of the owning location document inside firebase store
   * @param productId - id of a product document inside firebase store
   */
  public getProduct(locationId: string, productId: string): Observable<Product> {
    return this.db.doc<Product>(`locations/${locationId}/products/${productId}`).valueChanges();
  }
}
