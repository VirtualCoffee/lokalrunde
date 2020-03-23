import { Injectable } from '@angular/core';
import { LocationDetail, LocationType, LRLocation, Product, ProductType } from '../model/base';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(public db: AngularFirestore, public func: AngularFireFunctions) {
  }

  public getPlaces(): any {
    return this.db.collection('locations').valueChanges({ idField: 'id' });
  }

  /**
   * @param id - id of a location document inside firebase store
   */
  public getPlace(id: string): Observable<LRLocation> {
    return this.db.doc<LRLocation>(`locations/${id}`).valueChanges();
  }

  public getPlacesByCity(city: string): Observable<LRLocation[]> {
    return this.db
      .collection<LRLocation>('locations', ref => ref.where('city', '==', city))
      .valueChanges({ idField: 'id' });
  }

  public getPlaceByGooglePlaceId(
    googlePlaceId: string
  ): Observable<LRLocation[]> {
    const observable = this.db
      .collection<LRLocation>('locations', ref =>
        ref.where('googlePlaceId', '==', googlePlaceId)
      )
      .valueChanges({ idField: 'id' });
    return observable;
  }

  /**
   * @param id - id of a location document inside firebase store
   */
  public getPlaceDetails(id: string): Observable<LocationDetail[]> {
    return this.db
      .doc<LRLocation>(`locations/${id}`)
      .collection<LocationDetail>('details')
      .valueChanges();
  }

  /**
   * @param id - id of a location document inside firebase store
   */
  public getProductsForPlace(id: string): Observable<Product[]> {
    return this.db
      .doc(`locations/${id}`)
      .collection<Product>('products', ref => ref.orderBy('price', 'asc'))
      .valueChanges({ idField: 'id' });
  }

  /**
   * @param locationId - id of the owning location document inside firebase store
   * @param productId - id of a product document inside firebase store
   */
  public getProduct(
    locationId: string,
    productId: string
  ): Observable<Product> {
    return this.db
      .doc<Product>(`locations/${locationId}/products/${productId}`)
      .valueChanges();
  }

  /**
   * @param location - LRLocation
   */
  public async addPlace(location: LRLocation, locationDetail: LocationDetail) {
    // check if place already exists
    const locationSearch = await this.db
      .collection<LRLocation>('locations', ref =>
        ref.where('googlePlaceId', '==', location.googlePlaceId)
      )
      .get()
      .toPromise();

    if (!locationSearch.empty) {
      throw new Error('Locations already exists');
    }

    return this.db
      .collection('locations')
      .add(location)
      .then(docRef => {
        docRef
          .collection('details')
          .doc('details')
          .set(locationDetail);

        const productsCafe: Product[] = [
          {
            name: 'Kaffee',
            type: ProductType.COFFEE,
            price: 2.5
          },
          {
            name: 'Kuchen',
            type: ProductType.CAKE,
            price: 5.0
          },
          {
            name: 'Lokalrunde',
            type: ProductType.BUYAROUND,
            price: 20.0
          }
        ];
        const productsBar: Product[] = [
          {
            name: 'Bier',
            type: ProductType.BEER,
            price: 2.5
          },
          {
            name: 'Burger',
            type: ProductType.BURGER,
            price: 5.0
          },
          {
            name: 'Lokalrunde',
            type: ProductType.BUYAROUND,
            price: 20.0
          }
        ];

        if (location.type === LocationType.BAR) {
          productsBar.forEach(async product => {
            await docRef.collection('products').add(product);
          });
        } else if (location.type === LocationType.CAFE) {
          productsCafe.forEach(async product => {
            await docRef.collection('products').add(product);
          });
        }

        return docRef.id;
      });
  }

  public getGooglePlace(googlePlaceId: string): Promise<{ data: GooglePlaceModule }> {
    return this.func.functions.httpsCallable('place')({ googlePlaceId }) as Promise<any>;
  }
}

interface GooglePlaceModule {
  name: string;
  address: string;
  website: string;
  imageUrl: string;
  googlePlaceId: string;
  type: string;
  street: string;
  city: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}
