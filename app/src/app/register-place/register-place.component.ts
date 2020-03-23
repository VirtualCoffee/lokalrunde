import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from '../service/firebase.service';
import { LocationDetail, LocationType, LRLocation } from '../../../../functions/src/model/base';

@Component({
  selector: 'app-register-place',
  templateUrl: './register-place.component.html',
  styleUrls: ['./register-place.component.scss']
})
export class RegisterPlaceComponent {

  public place: Partial<LRLocation> = {};
  public placeDetail: Partial<LocationDetail> = {};
  public type = 'CAFE';
  public paypal = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    const googlePlaceId = route.snapshot.paramMap.get('googlePlaceId');

    firebaseService.getGooglePlace(googlePlaceId).then((result) => {
      const { data } = result;
      this.place = {
        googlePlaceId,
        name: data.name,
        imageUrl: data.imageUrl,
        city: data.city,
        street: data.street,
        zipCode: data.zipCode,
      };

      this.placeDetail = {
        lat: data.latitude,
        lng: data.longitude,
        website: data.website,
      };

      const type = (data.type || 'cafe').toLowerCase();
      this.type = type.includes('bar') ? 'BAR' : 'CAFE';
    }).catch(err => {
      console.error(err);
    });

  }

  public editField(field: string, title: string) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: { field, title, value: this.place[field] }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.place[field] = this.place[field] || result;
    });
  }

  valid(): boolean {
    return !!(
      this.place &&
      this.place.name &&
      this.paypal &&
      (this.paypal.match(/https:\/\/paypal\.me\/.+/) || this.paypal.match(/.+@.+\..+/))
    );
  }

  registerPlace() {
    this.firebaseService.addPlace({
      ...(this.place as any),
      type: this.type === 'BAR' ? LocationType.BAR : LocationType.CAFE,
    }, {
      ...(this.placeDetail as any),
      donationLink: this.paypal.match(/https:\/\/paypal\.me\/.+/) ? this.paypal : null,
      paypalAccountReceiver: this.paypal.match(/.+@.+\..+/) ? this.paypal : null,
    }).then(id => {
      this.router.navigate([`place/${id}`]);
    }).catch(err => {
      this.snackBar.open('Da ist etwas schief gelaufen.', undefined, { duration: 5000 });
    });
  }

}


interface DialogData {
  title: string;
  value: string;
}


@Component({
  selector: 'app-dialog-overview-example-dialog',
  template: `
    <h1 mat-dialog-title>{{data.title}}</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <!-- <mat-label>{{data.name}}</mat-label> -->
        <input matInput [(ngModel)]="data.value">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="data.value" cdkFocusInitial>Ok</button>
    </div>
  `
})
export class EditDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
}
