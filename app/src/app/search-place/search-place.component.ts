import { Component, OnInit, Input } from '@angular/core';
import { LRLocation } from '../model/base';
import { Observable } from 'rxjs';
import { FirebaseService } from '../service/firebase.service';
import { resolve } from 'url';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-search-place',
  templateUrl: './search-place.component.html',
  styleUrls: ['./search-place.component.scss']
})
export class SearchPlaceComponent implements OnInit {

  @Input() places : LRLocation[];

  constructor(private firebaseService: FirebaseService) { 
    
  }

  ngOnInit() {
    this.firebaseService.getPlaces().subscribe((result: LRLocation[]) => {
      console.log(result);
      this.places = result;
    })
  }
  
  public handleAddressChange(address: Address) {
    console.log(address);
  }

}
