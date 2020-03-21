import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchRestaurantComponent } from './search-restaurant/search-restaurant.component';

const appRoutes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'search', component: SearchRestaurantComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    SearchRestaurantComponent,
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
    )
    // other imports here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
