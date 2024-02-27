import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BikeStationComponent } from './bike-station/bike-station.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { LoginChecker } from './_helpers/loginChecker';
import { BikeStationDetailComponent } from './bike-station-detail/bike-station-detail.component';
import { BikeModelComponent } from './bike-model/bike-model.component';
import { BikemodelDetailComponent } from './bike-model-detail/bike-model-detail.component';
import { BikecategoryComponent } from './bike-category/bike-category.component';
import { BikeComponent } from './bike/bike.component';
import { BikeDetailComponent } from './bike-detail/bike-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BikeStationComponent,
    BoardUserComponent,
    BikeStationDetailComponent,
    BikeModelComponent,
    BikemodelDetailComponent,
    BikecategoryComponent,
    BikeComponent,
    BikeDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [httpInterceptorProviders, LoginChecker],
  bootstrap: [AppComponent],
})
export class AppModule {}
