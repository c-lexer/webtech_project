export class BikeStation {
  public rental_station_id: number = 0;
  public name: string = '';
  public address: string = '';
  public locationx: number = 0.0;
  public locationy: number = 0.0;
}

export class BikeParkingPlace {
  public parking_place_id: number = 0;
  public rental_station_id: number = 0;
  public bike_category_id: number = 0;
  public rented: boolean = false;
  public bike_id: number = 0;
}

export class BikeStationReview {
  public rental_station_customer_review_id: number = 0;
  public content: string = '';
  public rating: number = 0;
  public name: string = '';
}
export class BikeStationCapacity {
  public type: string = '';
  public capacity: number = 0;
  public taken: number = 0;
}
