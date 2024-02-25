import { Component, OnInit } from '@angular/core';
import { BikeStation } from '../_dataobjects/bikestation';
import { BikeStationService } from '../_services/bikestation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bike-station',
  templateUrl: './bike-station.component.html',
  styleUrls: ['./bike-station.component.css'],
})
export class BikeStationComponent implements OnInit {
  bikestations: BikeStation[] = [];

  constructor(
    private bikeStationService: BikeStationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBikeStations();
  }

  getBikeStations(): void {
    this.bikeStationService
      .getBikeStations()
      .subscribe((bikestations) => (this.bikestations = bikestations));
  }

  new(): void {
    // Redirect to bike-station-detail route
    // You can use the Angular Router to navigate to the desired route
    this.router.navigate(['/bikestations/new']);
  }
}
