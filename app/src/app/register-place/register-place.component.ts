import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { FirebaseService } from '../service/firebase.service';
import { LRLocation } from "../../../../functions/src/model/base"

@Component({
  selector: 'app-register-place',
  templateUrl: './register-place.component.html',
  styleUrls: ['./register-place.component.scss']
})
export class RegisterPlaceComponent {

  public googlePlaceId: string;
  public place?: LRLocation;
  public type = "CAFE";
  public paypal = "";

  constructor(route: ActivatedRoute, firebaseService: FirebaseService, private dialog: MatDialog) {
    this.googlePlaceId = route.snapshot.paramMap.get("googlePlaceID");
    firebaseService.getPlace(this.googlePlaceId).subscribe(result => {
      this.place = result;
    });
  }

  public editField(field: string, title: string) {
    const dialogRef = this.dialog.open(EditDialog, {
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
      this.place.imageUrl &&
      this.paypal &&
      (this.paypal.match(/https:\/\/paypal\.me\/.+/) || this.paypal.match(/.+@.+\..+/))
    );
  }

}

type DialogData = {
  title: string
  value: string
}


@Component({
  selector: 'dialog-overview-example-dialog',
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
export class EditDialog {

  constructor(
    public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}