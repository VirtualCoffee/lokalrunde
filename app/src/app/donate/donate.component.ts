import { Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { LocationDetail, Product } from '../model/base';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent {
  @ViewChild('stepper', { static: true }) stepper: MatStepper;
  public placeId: string;
  public productId: string;
  public placeDetails: LocationDetail;
  public product: Product;
  public termsAccepted = localStorage.acceptTerms === 'true';

  constructor(route: ActivatedRoute, firebaseService: FirebaseService) {
    this.placeId = route.snapshot.paramMap.get('id');
    this.productId = route.snapshot.paramMap.get('productId');
    firebaseService.getPlaceDetails(this.placeId).subscribe(results => {
      this.placeDetails = results[0];
    });
    firebaseService
      .getProduct(this.placeId, this.productId)
      .subscribe(result => {
        this.product = result;
      });
  }

  acceptTerms({ checked }: any) {
    localStorage.acceptTerms = String(checked);
    this.termsAccepted = checked;
  }

  pay() {
    const { donationLink, paypalAccountReceiver } = this.placeDetails;
    const price = this.product.price.toFixed(2);

    if (paypalAccountReceiver) {
      const returnURL = location.href.replace(
        /donate.*$/,
        'completed-donation'
      );
      window.open(
        `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalAccountReceiver}&currency_code=EUR&
        amount=${price}&return=${returnURL}&item_name=${this.product.name}`,
        '_self'
      );
    } else if (donationLink.includes('paypal.me')) {
      const trimmedDonationLink = donationLink.slice(
        0,
        donationLink.endsWith('/') ? -1 : donationLink.length
      );

      window.open(`${trimmedDonationLink}/${price}EUR`, '_blank');
      this.stepper.next();
    } else {
      console.error('Can not make donation. Missing paypal address / account');
    }
  }
}
