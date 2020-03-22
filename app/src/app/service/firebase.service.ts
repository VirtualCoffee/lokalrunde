import { Injectable } from "@angular/core";
import {
  LRLocation,
  Product,
  LocationDetail,
  ProductType,
  LocationType
} from "../model/base";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { privateEncrypt } from "crypto";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  constructor(public db: AngularFirestore) {}

  public getPlaces(): any {
    return this.db.collection("locations").valueChanges({ idField: "id" });
  }

  /**
   * @param id - id of a location document inside firebase store
   */
  public getPlace(id: string): Observable<LRLocation> {
    return this.db.doc<LRLocation>(`locations/${id}`).valueChanges();
  }

  /**
   * @param id - id of a location document inside firebase store
   
  public getPlaces(
    googlePlaceId: string,
    address: string
  ): Observable<LRLocation> {
    // Create a reference to the cities collection
    var locationRef = this.db.collection("locations");

    var city = address.split(",")[1].split(" ")[1];
    // Create a query against the collection.
    var query = locationRef.where("city", "==", city);

    return this.db.doc<LRLocation>(`locations/${id}`).valueChanges();
  }*/

  /**
   * @param id - id of a location document inside firebase store
   */
  public getPlaceDetails(id: string): Observable<LocationDetail[]> {
    return this.db
      .doc<LRLocation>(`locations/${id}`)
      .collection<LocationDetail>("details")
      .valueChanges();
  }

  /**
   @param id - id of a location document inside firebase store
   */
  public getProductsForPlace(id: string): Observable<Product[]> {
    return this.db
      .doc(`locations/${id}`)
      .collection<Product>("products")
      .valueChanges({ idField: "id" });
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
  public addPlace(location: LRLocation, locationDetail: LocationDetail) {
    return this.db
      .collection("locations")
      .add(location)
      .then(docRef => {
        docRef
          .collection("details")
          .doc("details")
          .set(locationDetail);

        const productsCafe: Product[] = [
          {
            name: "Kaffee",
            type: ProductType.COFFEE,
            price: 2.5
          },
          {
            name: "Kuchen",
            type: ProductType.CAKE,
            price: 5.0
          },
          {
            name: "Lokalrunde",
            type: ProductType.BUYAROUND,
            price: 20.0
          }
        ];
        const productsBar: Product[] = [
          {
            name: "Kaffee",
            type: ProductType.COFFEE,
            price: 2.5
          },
          {
            name: "Kuchen",
            type: ProductType.CAKE,
            price: 5.0
          },
          {
            name: "Lokalrunde",
            type: ProductType.BUYAROUND,
            price: 20.0
          }
        ];

        if (location.type === LocationType.BAR) {
          productsBar.forEach(async product => {
            await docRef.collection("products").add(product);
          });
        } else if (location.type === LocationType.CAFE) {
          productsCafe.forEach(async product => {
            await docRef.collection("products").add(product);
          });
        }
      });
  }
}
