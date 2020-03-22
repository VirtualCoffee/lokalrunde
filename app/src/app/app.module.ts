import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireFunctionsModule, REGION } from "@angular/fire/functions";
import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatStepperModule } from "@angular/material/stepper";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { environment } from "../environments/environment";
import { LandingpageComponent } from "./landingpage/landingpage.component";
import { SearchPlaceComponent } from "./search-place/search-place.component";
import { PlacePageComponent } from "./place-page/place-page.component";
import { CreatePlaceComponent } from "./create-place/create-place.component";
import { LoginComponent } from "./login/login.component";
import { DonateComponent } from "./donate/donate.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { CompletedDonationPageComponent } from "./completed-donation-page/completed-donation-page.component";
import { ShareButtonsModule } from "@ngx-share/buttons";
import { HttpClientModule } from "@angular/common/http";
import { ImprintComponent } from "./imprint/imprint.component";
import { TermsComponent } from './terms/terms.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fab, faFacebookF, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
  faCoffee,
  faCommentAlt,
  faExclamation,
  faLink,
  faMinus,
  faPrint,
  fas,
  faCheck,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { RegisterPlaceComponent, EditDialog } from "./register-place/register-place.component";
import { PrivacyComponent } from './privacy/privacy.component';
import { DemobannerComponent } from './demobanner/demobanner.component'

const appRoutes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchPlaceComponent },
  { path: 'place/create', component: CreatePlaceComponent },
  { path: 'place/:id', component: PlacePageComponent },
  { path: 'place/:id/donate/:productId', component: DonateComponent },
  {
    path: 'place/:id/completed-donation',
    component: CompletedDonationPageComponent
  },
  { path: "imprint", component: ImprintComponent },
  { path: "terms", component: TermsComponent },
  { path: "privacy", component: PrivacyComponent },
  { path: "register/:googlePlaceId", component: RegisterPlaceComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    SearchPlaceComponent,
    PlacePageComponent,
    CreatePlaceComponent,
    LoginComponent,
    DonateComponent,
    ToolbarComponent,
    CompletedDonationPageComponent,
    ImprintComponent,
    TermsComponent,
    RegisterPlaceComponent,
    EditDialog,
    PrivacyComponent,
    DemobannerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    ShareButtonsModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    GooglePlaceModule
    // other imports here
  ],
  providers: [
      { provide: REGION, useValue: 'europe-west1' }
  ],
  entryComponents: [AppComponent, EditDialog],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab);
    library.addIcons(
      faTwitter,
      faFacebookF,
      faWhatsapp,
      faCoffee,
      faCommentAlt,
      faMinus,
      faLink,
      faExclamation,
      faPrint,
      faCheck,
      faEnvelope
    );
  }
}
