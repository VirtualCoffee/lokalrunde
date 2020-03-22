import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationDetail, LRLocation, Product } from '../model/base';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-place-page',
  templateUrl: './place-page.component.html',
  styleUrls: ['./place-page.component.scss']
})
export class PlacePageComponent {

  public placeId: string;
  public place?: LRLocation;
  public placeDetails?: LocationDetail;
  public products?: Product[];

  constructor(route: ActivatedRoute, firebaseService: FirebaseService) {
    this.placeId = route.snapshot.paramMap.get('id');
    firebaseService.getPlace(this.placeId).subscribe(result => {
      this.place = result;
    });

    firebaseService.getPlaceDetails(this.placeId).subscribe(results => {
      this.placeDetails = results[0];
    });

    firebaseService.getProductsForPlace(this.placeId).subscribe(results => {
      console.log(results);
      this.products = results;
    });

  }

  public getTypeIcon(type: string): string {
    return {
      COFFEE: '../../assets/images/icon-coffee.svg',
      BEER: '../../assets/images/icon-drink.svg',
      CAKE: '../../assets/images/icon-food.svg',
      BURGER: '../../assets/images/icon-food.svg',
    }[type];
  }

  public visitPlace() {
    if (this.placeDetails) {
      window.open(this.placeDetails.website, '_blank');
    }
  }

}
