import { Component, OnInit } from '@angular/core';
import { Bike } from '../_dataobjects/bike';
import { BikeService } from '../_services/bike.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css'],
})
export class BikeComponent implements OnInit {
  bikes: Bike[] = [];

  constructor(private bikeService: BikeService, private router: Router) {}

  ngOnInit(): void {
    this.getBikes();
  }

  getBikes(): void {
    this.bikeService.getBikes().subscribe((bikes) => (this.bikes = bikes));
  }

  new(): void {
    // Redirect to bike-detail route
    // You can use the Angular Router to navigate to the desired route
    this.router.navigate(['/bikes/new']);
  }
}
