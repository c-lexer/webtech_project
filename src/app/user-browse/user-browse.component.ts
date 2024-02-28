import { Component, OnInit } from '@angular/core';
import { BikeStation } from '../_dataobjects/bikestation';
import { BikeStationService } from '../_services/bikestation.service';
import { Bikemodel } from '../_dataobjects/bikemodel';
import { BikemodelService } from '../_services/bikemodel.service';

@Component({
  selector: 'app-user-browse',
  templateUrl: './user-browse.component.html',
  styleUrl: './user-browse.component.css',
})
export class UserBrowseComponent implements OnInit {
  bikestations: BikeStation[] = [];
  bikemodels: Bikemodel[] = [];
  router: any;

  constructor(
    private bikeStationService: BikeStationService,
    private bikeModelService: BikemodelService
  ) {}

  ngOnInit(): void {
    this.getBikeStations();
    this.getBikeModels();
  }

  getBikeStations(): void {
    this.bikeStationService
      .getBikeStations()
      .subscribe((bikestations) => (this.bikestations = bikestations));
  }
  getBikeModels(): void {
    this.bikeModelService
      .getBikemodels()
      .subscribe((bikemodels) => (this.bikemodels = bikemodels));
  }

  new(): void {
    // Redirect to bike-station-detail route
    // You can use the Angular Router to navigate to the desired route
    this.router.navigate(['/bikestations/new']);
  }
}
