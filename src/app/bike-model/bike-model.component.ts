import { Component, OnInit } from '@angular/core';
import { Bikemodel } from '../_dataobjects/bikemodel';
import { BikemodelService } from '../_services/bikemodel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bike-model',
  templateUrl: './bike-model.component.html',
  styleUrls: ['./bike-model.component.css'],
})
export class BikeModelComponent implements OnInit {
  bikemodels: Bikemodel[] = [];

  constructor(
    private bikemodelService: BikemodelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBikemodels();
  }

  getBikemodels(): void {
    this.bikemodelService
      .getBikemodels()
      .subscribe((bikemodels) => (this.bikemodels = bikemodels));
  }

  new(): void {
    // Redirect to bike-model-detail route
    // You can use the Angular Router to navigate to the desired route
    this.router.navigate(['/bikemodels/new']);
  }
}
