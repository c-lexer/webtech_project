export class Bikemodel {
  public bike_model_id: number = 0;
  public name: string = '';
  public description: string = '';
  public wheel_size: number = 0;
  public bike_category_id: number = 0;
}

export class BikeModelReview {
  public rental_station_customer_review_id: number = 0;
  public content: string = '';
  public rating: string = '';
  public name: string = '';
}

export class BikeModelFeature {
  public bike_feature_id: number = 0;
  public name: string = '';
}
