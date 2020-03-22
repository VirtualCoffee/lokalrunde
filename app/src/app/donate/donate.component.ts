import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
  @ViewChild('stepper', {static: true}) stepper: MatStepper;
  public placeId: string;

  constructor(route: ActivatedRoute, firebaseService: FirebaseService) {
    this.placeId = route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
  }

  pay() {
    window.open('https://www.paypal.me/tommay1523/2.5EUR', "_blank");
    
    this.stepper.next();

  }
}
