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
import { StorageService } from '../_services/storage.service';
import { Bikemodel } from '../_dataobjects/bikemodel';
import { BikemodelService } from '../_services/bikemodel.service';
import { Bike } from '../_dataobjects/bike';
import { BikeService } from '../_services/bike.service';

@Component({
  selector: 'app-bike-station-detail',
  templateUrl: './bike-station-detail.component.html',
  styleUrls: ['./bike-station-detail.component.css'],
})
export class BikeStationDetailComponent implements OnInit {
  bikestation: BikeStation | undefined;
  bikeparkingplaces: BikeParkingPlace[] = [];
  bikestationreviews: BikeStationReview[] = [];
  averageRating: number = 0;
  bikestationcapacities: BikeStationCapacity[] = [];
  bikecategorys: Bikecategory[] = [];
  bikemodels: Bikemodel[] = [];
  bikes: Bike[] = [];
  isValid: boolean = true;
  selectedValue: Number = 1;
  isNew: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bikeStationService: BikeStationService,
    private bikecategoryService: BikecategoryService,
    private storageService: StorageService,
    private bikemodelService: BikemodelService,
    private bikeService: BikeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.storageService.getUser().role === 'admin';
    this.getBikeStation();
  }

  getBikeParkingPlaces(id: number): void {
    this.bikeStationService
      .getBikeParkingPlaces(id)
      .subscribe((bikeparkingplaces) => {
        this.bikeparkingplaces = bikeparkingplaces;
        console.log(bikeparkingplaces);
      });
  }

  getBikeStationReviews(id: number): void {
    this.bikeStationService
      .getBikeStationReviews(id)
      .subscribe((bikestationreview) => {
        this.bikestationreviews = bikestationreview;
        this.averageRating = this.getRating();
      });
  }

  getBikeCategorys(): void {
    this.bikecategoryService
      .getCategorys()
      .subscribe((bikecategorys) => (this.bikecategorys = bikecategorys));
  }

  getBikeModels(): void {
    this.bikemodelService
      .getBikemodels()
      .subscribe((bikemodels) => (this.bikemodels = bikemodels));
  }

  getBikes(): void {
    this.bikeService.getBikes().subscribe((bikes) => (this.bikes = bikes));
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
      this.isNew = true;
    } else {
      const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

      this.bikeStationService
        .getBikeStation(id)
        .subscribe((bikestation) => (this.bikestation = bikestation));
      this.getBikeParkingPlaces(id);
      this.getBikeStationCapacities(id);
      this.getBikeStationReviews(id);
      this.getBikeCategorys();
      this.getBikeModels();
      this.getBikes();
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

  getModelString(bike_id: number): string {
    console.log(this.bikes);
    console.log(bike_id);
    return this.bikes.find((x) => x.bike_id === bike_id)?.bike_model_name || '';
  }

  getCategoryString(id: number): string {
    return (
      this.bikecategorys.find((x) => x.bike_category_id === id)?.name || ''
    );
  }

  getRating(): number {
    if (this.bikestationreviews.length === 0) {
      return 0;
    }
    let length = this.bikestationreviews.length;
    let sum = 0;
    for (var i = 0; i < length; i++) {
      sum += +this.bikestationreviews[i].rating;
    }

    return sum / length;
  }

  isRented(status: boolean) {
    return status ? 'Yes' : 'No';
  }
}
