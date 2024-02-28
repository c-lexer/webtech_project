import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Bikemodel, BikeModelReview } from '../_dataobjects/bikemodel';
import { Bikecategory } from '../_dataobjects/bikecategorys';
import { BikemodelService } from '../_services/bikemodel.service';
import { BikecategoryService } from '../_services/bikecategory.service';
import { BikeModelFeature } from '../_dataobjects/bikemodel';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-bike-model-detail',
  templateUrl: './bike-model-detail.component.html',
  styleUrls: ['./bike-model-detail.component.css'],
})
export class BikemodelDetailComponent implements OnInit {
  bikemodel: Bikemodel | undefined;
  bikemodelreviews: BikeModelReview[] = [];
  categorys: Bikecategory[] = [];
  isValid: boolean = true;
  selectedValue: number = 1;
  features: BikeModelFeature[] = [];
  isNew: boolean = false;
  modelId: number = 0;
  isAdmin: boolean = false;
  averageRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private bikemodelservice: BikemodelService,
    private bikecategoryService: BikecategoryService,
    private location: Location,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.storageService.getUser().role === 'admin';
    if (this.route.snapshot.paramMap.get('id')!.includes('new')) {
      this.isNew = true;
    } else {
      this.modelId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    }
    this.getBikemodel();
    this.getCategorys();
    this.getBikemodelFeatures();
    if (this.bikemodel) {
      this.selectedValue = this.bikemodel.bike_category_id;
    }
  }

  getBikemodelReviews(id: number): void {
    this.bikemodelservice
      .getBikeModelReviews(id)
      .subscribe((bikemodelreview) => {
        this.bikemodelreviews = bikemodelreview;
        this.averageRating = this.getRating();
      });
  }

  getBikemodel(): void {
    if (this.isNew) {
      this.bikemodel = new Bikemodel();
    } else {
      this.bikemodelservice
        .getBikemodel(this.modelId)
        .subscribe((bikemodel) => {
          this.bikemodel = bikemodel;
          this.selectedValue = bikemodel.bike_category_id;
        });
      this.getBikemodelReviews(this.modelId);
    }
  }

  getCategorys(): void {
    this.bikecategoryService
      .getCategorys()
      .subscribe((categorys) => (this.categorys = categorys));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.bikemodel?.bike_model_id === 0 && this.validateForm()) {
      this.bikemodel.bike_category_id = this.selectedValue;
      this.bikemodelservice
        .postBikeModel(this.bikemodel)
        .subscribe(() => this.goBack());
    } else if (this.bikemodel && this.validateForm()) {
      this.bikemodel.bike_category_id = this.selectedValue;
      this.bikemodelservice
        .updateBikeModel(this.bikemodel)
        .subscribe(() => this.goBack());
    }
  }

  isValidForm(): boolean {
    return this.isValid;
  }

  validateForm(): boolean {
    if (this.bikemodel && Number.isFinite(this.bikemodel.wheel_size)) {
      this.isValid = true;
      return true;
    } else {
      this.isValid = false;
      return false;
    }
  }

  delete(): void {
    if (this.bikemodel && this.validateForm()) {
      this.bikemodelservice
        .deleteBikeModel(this.bikemodel.bike_model_id)
        .subscribe(() => this.goBack());
    }
  }

  getBikemodelFeatures(): void {
    if (this.isNew) {
      return;
    } else {
      this.bikemodelservice
        .getBikeModelFeatures(this.modelId)
        .subscribe((features) => (this.features = features));
    }
  }

  deleteFeature(feature: BikeModelFeature): void {
    this.features = this.features.filter((f) => f !== feature);
    if (this.bikemodel) {
      this.bikemodelservice
        .deleteBikeModelFeature(
          this.bikemodel.bike_model_id,
          feature.bike_feature_id
        )
        .subscribe();
    }
  }

  add(name: string): void {
    if (this.isNew) {
      return;
    }
    name = name.trim();
    console;
    if (!name) {
      return;
    }
    const feature = new BikeModelFeature();
    feature.name = name;
    this.bikemodelservice
      .postBikeFeature(feature, this.modelId)
      .subscribe((feature: BikeModelFeature) => {
        this.features.push(feature);
      });
  }

  getRating(): number {
    if (this.bikemodelreviews.length === 0) {
      return 0;
    }
    let length = this.bikemodelreviews.length;
    let sum = 0;
    for (var i = 0; i < length; i++) {
      sum += +this.bikemodelreviews[i].rating;
    }

    return sum / length;
  }
}
