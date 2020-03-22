import { Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { Product, LocationDetail } from "../model/base"
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent {
  @ViewChild('stepper', {static: true}) stepper: MatStepper;
  public placeId: string;
  public productId: string;
  public placeDetails: LocationDetail;
  public product: Product;

  constructor(route: ActivatedRoute, firebaseService: FirebaseService) {
    this.placeId = route.snapshot.paramMap.get("id");
    this.productId = route.snapshot.paramMap.get("productId");
    firebaseService.getPlaceDetails(this.placeId).subscribe(results => {
      this.placeDetails = results[0];
    });
    firebaseService.getProductsForPlace(this.placeId).subscribe(results => {
      this.product = results.find(p => p.id === this.productId);
    });
  }

  pay() {
    const { donationLink } = this.placeDetails;
    const trimmedDonationLink = donationLink.slice(0, donationLink.endsWith("/") ? -1 : donationLink.length);
    window.open(`${trimmedDonationLink}/${this.product.price.toFixed(2)}EUR`, "_blank");
    this.stepper.next();
  }
}
