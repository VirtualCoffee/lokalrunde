import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from "@angular/material/button"
import { environment } from '../environments/environment';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SearchRestaurantComponent } from './search-restaurant/search-restaurant.component';
import { PlacePageComponent } from './place-page/place-page.component';
import { CreatePlaceComponent } from './create-place/create-place.component';
import { LoginComponent } from './login/login.component';
import { DonateComponent } from './donate/donate.component';

const appRoutes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchRestaurantComponent },
  { path: 'place/:id', component: PlacePageComponent },
  { path: 'createPlace', component: CreatePlaceComponent },
  { path: 'donate', component: DonateComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    SearchRestaurantComponent,
    PlacePageComponent,
    CreatePlaceComponent,
    LoginComponent,
    DonateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    MatButtonModule,
    // other imports here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
