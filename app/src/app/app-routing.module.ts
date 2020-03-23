import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { SearchPlaceComponent } from './search-place/search-place.component';
import { CreatePlaceComponent } from './create-place/create-place.component';
import { PlacePageComponent } from './place-page/place-page.component';
import { DonateComponent } from './donate/donate.component';
import { CompletedDonationPageComponent } from './completed-donation-page/completed-donation-page.component';
import { ImprintComponent } from './imprint/imprint.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RegisterPlaceComponent } from './register-place/register-place.component';
import { ToolbarComponent } from './toolbar/toolbar.component';


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
  { path: 'imprint', component: ImprintComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'register/:googlePlaceId', component: RegisterPlaceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


