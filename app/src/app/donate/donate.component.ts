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
    firebaseService.getProduct(this.placeId, this.productId).subscribe(result => {
      this.product = result;
    });
  }

  pay() {
    // TODO: distinguish between paypal.me link and paypal account. Will be readable from different data field in the future
    const { donationLink } = this.placeDetails;
    const trimmedDonationLink = donationLink.slice(0, donationLink.endsWith("/") ? -1 : donationLink.length);
    const price = this.product.price.toFixed(2)

    if (trimmedDonationLink.includes("paypal.me")) {
      window.open(`${trimmedDonationLink}/${price}EUR`, "_blank");
      this.stepper.next();
    } else {
      const paypalAccount = trimmedDonationLink
      const returnURL = location.href.replace(/donate.*$/, "completed-donation");
      window.open(`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalAccount}&currency_code=EUR&amount=${price}&return=${returnURL}&item_name=${this.product.name}`, "_self");
    }
  }
}
