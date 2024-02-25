import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  BikeStation,
  BikeParkingPlace,
  BikeStationReview,
  BikeStationCapacity,
} from '../_dataobjects/bikestation';
import { Bikecategory } from '../_dataobjects/bikecategorys';

@Injectable({ providedIn: 'root' })
export class BikeStationService {
  private bikeStationsUrl = 'http://localhost:3000/api/bikestations'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET BikeStations from the server */
  getBikeStations(): Observable<BikeStation[]> {
    return this.http
      .get<BikeStation[]>(this.bikeStationsUrl)
      .pipe(catchError(this.handleError<BikeStation[]>('getBikeStations', [])));
  }

  /** GET getBikeStation by id. Will 404 if id not found */
  getBikeStation(id: number): Observable<BikeStation> {
    const url = `${this.bikeStationsUrl}/${id}`;
    return this.http
      .get<BikeStation>(url)
      .pipe(
        catchError(this.handleError<BikeStation>(`getBikeStation id=${id}`))
      );
  }

  updateBikeStation(bikestation: BikeStation): Observable<any> {
    return this.http
      .put(this.bikeStationsUrl, bikestation, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateStation')));
  }

  deleteBikeStation(id: number): Observable<any> {
    const url = `${this.bikeStationsUrl}/${id}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateStation')));
  }

  postBikeStation(bikestation: BikeStation): Observable<any> {
    return this.http
      .post(this.bikeStationsUrl, bikestation, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateStation')));
  }

  getBikeParkingPlaces(id: number): Observable<BikeParkingPlace[]> {
    const url = `${this.bikeStationsUrl}/${id}/parkingplaces`;
    return this.http
      .get<BikeParkingPlace[]>(url)
      .pipe(
        catchError(
          this.handleError<BikeParkingPlace[]>(`getBikeStation id=${id}`)
        )
      );
  }

  deleteBikeParkingPlaces(
    stationId: number,
    idParkingPlace: number
  ): Observable<any> {
    const url = `${this.bikeStationsUrl}/${stationId}/parkingplace/${idParkingPlace}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError<any>('deleteParkingPlace')));
  }

  postBikeParkingPlaces(
    bike_category: Bikecategory,
    id: number
  ): Observable<any> {
    const url = `${this.bikeStationsUrl}/${id}/parkingplaces`;
    return this.http
      .post(url, bike_category, this.httpOptions)
      .pipe(catchError(this.handleError<any>('postBikeParkingPlaces')));
  }

  getBikeStationReviews(id: number): Observable<BikeStationReview[]> {
    const url = `${this.bikeStationsUrl}/${id}/reviews`;
    return this.http
      .get<BikeStationReview[]>(url)
      .pipe(
        catchError(
          this.handleError<BikeStationReview[]>(`getBikeStation id=${id}`)
        )
      );
  }

  getBikeStationCapacities(id: number): Observable<BikeStationCapacity[]> {
    const url = `${this.bikeStationsUrl}/${id}/capacity`;
    return this.http
      .get<BikeStationCapacity[]>(url)
      .pipe(
        catchError(
          this.handleError<BikeStationCapacity[]>(`getBikeStation id=${id}`)
        )
      );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
