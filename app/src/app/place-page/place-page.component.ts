import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LRLocation, Product } from "../model/base"
import { FirebaseService } from "../service/firebase.service"

@Component({
  selector: 'app-place-page',
  templateUrl: './place-page.component.html',
  styleUrls: ['./place-page.component.scss']
})
export class PlacePageComponent {

  public placeId: string;
  public place?: LRLocation
  public products?: Product[]

  constructor(route: ActivatedRoute, firebaseService: FirebaseService) {
    this.placeId = route.snapshot.paramMap.get("id");
    firebaseService.getPlace(this.placeId).subscribe(result => {
      this.place = result;
    });

    firebaseService.getProductsForPlace(this.placeId).subscribe(results => {
      console.log(results);
      this.products = results;
    });

  }

  public getTypeIcon(type: string): string {
    return {
      COFFEE: "../../assets/images/icon-coffee.png",
      BEER: "../../assets/images/icon-drink.png",
      CAKE: "../../assets/images/icon-food.png",
      BURGER: "../../assets/images/icon-food.png",
    }[type];
  }

}
