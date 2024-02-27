import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Bike } from '../_dataobjects/bike';
import { BikeService } from '../_services/bike.service';
import { Bikecategory } from '../_dataobjects/bikecategorys';
import { BikecategoryService } from '../_services/bikecategory.service';
import { Bikemodel } from '../_dataobjects/bikemodel';
import { BikeStationService } from '../_services/bikestation.service';
import { BikemodelService } from '../_services/bikemodel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bike',
  templateUrl: './bike-detail.component.html',
  styleUrls: ['./bike-detail.component.css'],
})
export class BikeDetailComponent implements OnInit {
  bike: Bike | undefined;
  bikecategorys: Bikecategory[] = [];
  bikeModels: Bikemodel[] = [];
  bikeStations: any[] = [];
  selectedModel: number = 1;
  selectedStation: number = 1;
  isNew: boolean = false;
  bikeId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private bikeService: BikeService,
    private bikecategoryService: BikecategoryService,
    private bikeStationService: BikeStationService,
    private bikeModelService: BikemodelService,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')!.includes('new')) {
      this.isNew = true;
    } else {
      this.bikeId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    }
    this.getBike();
    this.getBikeCategorys();
    this.getBikemodels();
    this.getBikeStations();
  }

  getBikeStations(): void {
    this.bikeStationService
      .getBikeStations()
      .subscribe((bikeStations) => (this.bikeStations = bikeStations));
  }

  getBikemodels(): void {
    this.bikeModelService
      .getBikemodels()
      .subscribe((bikeModels) => (this.bikeModels = bikeModels));
  }

  getBike(): void {
    if (this.isNew) {
      this.bike = new Bike();
    } else {
      this.bikeService.getBike(this.bikeId).subscribe((bike) => {
        (this.bike = bike),
          (this.selectedModel = bike.bike_model_id),
          (this.selectedStation = bike.rental_station_id);
      });
    }
  }

  delete(): void {
    if (this.bikeId !== 0) {
      this.bikeService.deleteBike(this.bikeId).subscribe(() => this.goBack());
    }
  }

  getBikeCategorys(): void {
    this.bikecategoryService
      .getCategorys()
      .subscribe((bikecategorys) => (this.bikecategorys = bikecategorys));
  }

  getCategory(id: number): number {
    const model = this.bikeModels.find((x) => x.bike_model_id === id);
    return (
      this.bikecategorys.find(
        (x) => x.bike_category_id === model?.bike_category_id
      )?.bike_category_id || 0
    );
  }

  add(model_id: number): void {
    const bike = new Bike();
    bike.bike_model_id = model_id;
    this.bikeService.postBike(bike as Bike).subscribe(() => {
      this.ngOnInit();
    });
  }

  save(): void {
    if (this.bike) {
      this.bike.bike_model_id = this.selectedModel;
      this.bike.rental_station_id = this.selectedStation;
      this.bikeService.updateBike(this.bike).subscribe(() => {
        this.goBack();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
