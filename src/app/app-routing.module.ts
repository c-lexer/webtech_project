import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BikeStationComponent } from './bike-station/bike-station.component';
import { BikeStationDetailComponent } from './bike-station-detail/bike-station-detail.component';
import { BikeModelComponent } from './bike-model/bike-model.component';
import { BikemodelDetailComponent } from './bike-model-detail/bike-model-detail.component';
import { LoginChecker } from './_helpers/loginChecker';
import { BikecategoryComponent } from './bike-category/bike-category.component';
import { BikeComponent } from './bike/bike.component';
import { BikeDetailComponent } from './bike-detail/bike-detail.component';
import { RegisterComponent } from './register/register.component';
import { UserBrowseComponent } from './user-browse/user-browse.component';
import { UserBookingComponent } from './user-booking/user-booking.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: BoardUserComponent, canActivate: [LoginChecker] },
  {
    path: 'bikestations',
    component: BikeStationComponent,
    canActivate: [LoginChecker],
  },
  {
    path: 'bikestations/:id',
    component: BikeStationDetailComponent,
    canActivate: [LoginChecker],
  },
  {
    path: 'bikemodels',
    component: BikeModelComponent,
    canActivate: [LoginChecker],
  },
  {
    path: 'bikemodels/:id',
    component: BikemodelDetailComponent,
    canActivate: [LoginChecker],
  },
  {
    path: 'bikecategorys',
    component: BikecategoryComponent,
    canActivate: [LoginChecker],
  },
  {
    path: 'bikes',
    component: BikeComponent,
    canActivate: [LoginChecker],
  },
  {
    path: 'bikes/:id',
    component: BikeDetailComponent,
    canActivate: [LoginChecker],
  },
  {
    path: 'browse',
    component: UserBrowseComponent,
    canActivate: [LoginChecker],
  },
  {
    path: 'booking',
    component: UserBookingComponent,
    canActivate: [LoginChecker],
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
