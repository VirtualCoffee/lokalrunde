import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatStepperModule } from "@angular/material/stepper";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
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

import {
  FontAwesomeModule,
  FaIconLibrary
} from "@fortawesome/angular-fontawesome";
import {
  fab,
  faTwitter,
  faFacebookF,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";
import {
  fas,
  faCoffee,
  faCommentAlt,
  faMinus,
  faLink,
  faExclamation,
  faPrint,
  faCheck,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

const appRoutes: Routes = [
  { path: "", component: LandingpageComponent },
  { path: "login", component: LoginComponent },
  { path: "search", component: SearchPlaceComponent },
  { path: "place/create", component: CreatePlaceComponent },
  { path: "place/:id", component: PlacePageComponent },
  { path: "place/:id/donate/:productId", component: DonateComponent },
  {
    path: "place/:id/completed-donation",
    component: CompletedDonationPageComponent
  }
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
    CompletedDonationPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    ShareButtonsModule
    // other imports here
  ],
  providers: [],
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
