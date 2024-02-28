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
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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

  save(): void {
    if (this.bike) {
      this.bike.bike_model_id = this.selectedModel;
      this.bike.rental_station_id = this.selectedStation;
      this.bike.bike_category_id = this.getCategory(this.selectedModel);
      if (this.isNew) {
        this.bikeService
          .postBike(this.bike)
          .pipe(catchError(this.handleError))
          .subscribe(() => this.goBack());
      } else {
        this.bikeService
          .updateBike(this.bike)
          .pipe(catchError(this.handleError))
          .subscribe(() => this.goBack());
      }
    }
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      window.alert('Response from server: ' + error.error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => {
      new Error('Something bad happened; please try again later.');
    });
  }

  goBack(): void {
    this.location.back();
  }
}
