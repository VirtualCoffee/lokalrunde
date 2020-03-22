import { Component, Input, OnInit } from '@angular/core';
import { LRLocation } from '../model/base';
import { FirebaseService } from '../service/firebase.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-search-place',
  templateUrl: './search-place.component.html',
  styleUrls: ['./search-place.component.scss']
})
export class SearchPlaceComponent implements OnInit {

  @Input() places: LRLocation[];
  address: Address;
  lrlocation: LRLocation;
  searchResultInvalidType: boolean;
  nearLocations: LRLocation[];

  public validTypes: string[] = ['bakery', 'bar', 'cafe', 'liquor_store', 'restaurant', 'night_club'];
  public autocompleteOptions: any = {
    types: ['establishment'],
    componentRestrictions: { country: 'DE' }
  };

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.firebaseService.getPlaces().subscribe((result: LRLocation[]) => {
      this.places = result;
    });
  }

  handleAddressChange(address: Address) {
    if (!address.types.some(value => this.validTypes.includes(value))) {
      this.searchResultInvalidType = true;
      this.firebaseService.getPlacesByCity(address.place_id).subscribe(results => {
        this.places = results;
        console.log(results);
      });
      return;
    }
    this.searchResultInvalidType = false;
    this.address = address;

    this.firebaseService.getPlaceByGooglePlaceId(address.place_id).subscribe(result => {
      this.lrlocation = result[0];
    });

    if (this.lrlocation == null) {
      this.firebaseService.getPlacesByCity(address.place_id).subscribe(results => {
          this.places = results;
          console.log(results);
        }
      );
    }
  }
}
