import { Component, OnInit } from '@angular/core';
import { Bikecategory } from '../_dataobjects/bikecategorys';
import { BikecategoryService } from '../_services/bikecategory.service';
@Component({
  selector: 'app-bike-category',
  templateUrl: './bike-category.component.html',
  styleUrls: ['./bike-category.component.css'],
})
export class BikecategoryComponent implements OnInit {
  bikecategorys: Bikecategory[] = [];

  constructor(private bikecategoryService: BikecategoryService) {}

  ngOnInit(): void {
    this.getBikecategorys();
  }

  getBikecategorys(): void {
    this.bikecategoryService
      .getCategorys()
      .subscribe((bikecategorys) => (this.bikecategorys = bikecategorys));
  }

  delete(category: Bikecategory): void {
    this.bikecategorys = this.bikecategorys.filter((c) => c !== category);
    this.bikecategoryService
      .deleteBikecategory(category.bike_category_id)
      .subscribe();
  }

  add(name: string): void {
    name = name.trim();
    console;
    if (!name) {
      return;
    }
    console.log(this.bikecategorys);
    this.bikecategoryService
      .postBikecategory({ name } as Bikecategory)
      .subscribe((category: Bikecategory) => {
        this.bikecategorys.push(category);
      });
  }
}
