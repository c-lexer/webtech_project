import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {
  BikeStation,
  BikeParkingPlace,
  BikeStationReview,
  BikeStationCapacity,
} from '../_dataobjects/bikestation';
import { BikeStationService } from '../_services/bikestation.service';
import { Bikecategory } from '../_dataobjects/bikecategorys';
import { BikecategoryService } from '../_services/bikecategory.service';

@Component({
  selector: 'app-bike-station-detail',
  templateUrl: './bike-station-detail.component.html',
  styleUrls: ['./bike-station-detail.component.css'],
})
export class BikeStationDetailComponent implements OnInit {
  bikestation: BikeStation | undefined;
  bikeparkingplaces: BikeParkingPlace[] = [];
  bikestationreviews: BikeStationReview[] = [];
  bikestationcapacities: BikeStationCapacity[] = [];
  bikecategorys: Bikecategory[] = [];
  isValid: boolean = true;
  selectedValue: number = 1;

  constructor(
    private route: ActivatedRoute,
    private bikeStationService: BikeStationService,
    private bikecategoryService: BikecategoryService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBikeStation();
  }

  getBikeParkingPlaces(id: number): void {
    this.bikeStationService
      .getBikeParkingPlaces(id)
      .subscribe(
        (bikeparkingplaces) => (this.bikeparkingplaces = bikeparkingplaces)
      );
  }

  getBikeStationReviews(id: number): void {
    this.bikeStationService
      .getBikeStationReviews(id)
      .subscribe(
        (bikestationreview) => (this.bikestationreviews = bikestationreview)
      );
  }

  getBikeCategorys(): void {
    this.bikecategoryService
      .getCategorys()
      .subscribe((bikecategorys) => (this.bikecategorys = bikecategorys));
  }

  getBikeStationCapacities(id: number): void {
    this.bikeStationService
      .getBikeStationCapacities(id)
      .subscribe(
        (bikestationcapacities) =>
          (this.bikestationcapacities = bikestationcapacities)
      );
  }

  getBikeStation(): void {
    if (this.route.snapshot.paramMap.get('id')!.includes('new')) {
      this.bikestation = new BikeStation();
    } else {
      const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

      this.bikeStationService
        .getBikeStation(id)
        .subscribe((bikestation) => (this.bikestation = bikestation));
      this.getBikeParkingPlaces(id);
      this.getBikeStationCapacities(id);
      this.getBikeStationReviews(id);
      this.getBikeCategorys();
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.bikestation?.rental_station_id === 0 && this.validateForm()) {
      this.bikeStationService
        .postBikeStation(this.bikestation)
        .subscribe(() => this.goBack());
    } else if (this.bikestation && this.validateForm()) {
      this.bikeStationService
        .updateBikeStation(this.bikestation)
        .subscribe(() => this.goBack());
    }
  }

  isValidForm(): boolean {
    return this.isValid;
  }

  validateForm(): boolean {
    if (
      this.bikestation &&
      Number.isFinite(this.bikestation.locationx) &&
      Number.isFinite(this.bikestation.locationy)
    ) {
      this.isValid = true;
      return true;
    } else {
      this.isValid = false;
      return false;
    }
  }

  delete(): void {
    if (this.bikestation && this.validateForm()) {
      this.bikeStationService
        .deleteBikeStation(this.bikestation.rental_station_id)
        .subscribe(() => this.goBack());
    }
  }

  deleteParking(parking: BikeParkingPlace): void {
    if (this.bikestation) {
      this.bikeStationService
        .deleteBikeParkingPlaces(
          this.bikestation.rental_station_id,
          parking.parking_place_id
        )
        .subscribe(() => this.ngOnInit());
    }
  }

  add(): void {
    const category = this.bikecategorys.find(
      (x) => x.bike_category_id === this.selectedValue
    );
    if (this.bikestation && category) {
      this.bikeStationService
        .postBikeParkingPlaces(category, this.bikestation?.rental_station_id)
        .subscribe(() => {
          this.ngOnInit();
        });
    }
  }
}
