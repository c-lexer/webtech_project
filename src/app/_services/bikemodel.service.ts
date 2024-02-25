import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  BikeModelFeature,
  BikeModelReview,
  Bikemodel,
} from '../_dataobjects/bikemodel';

@Injectable({ providedIn: 'root' })
export class BikemodelService {
  private bikemodelsUrl = 'http://localhost:3000/api/bikemodels'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET Bikemodels from the server */
  getBikemodels(): Observable<Bikemodel[]> {
    return this.http
      .get<Bikemodel[]>(this.bikemodelsUrl)
      .pipe(catchError(this.handleError<Bikemodel[]>('getBikemodels', [])));
  }

  /** GET getBikeStation by id. Will 404 if id not found */
  getBikemodel(id: number): Observable<Bikemodel> {
    const url = `${this.bikemodelsUrl}/${id}`;
    return this.http
      .get<Bikemodel>(url)
      .pipe(catchError(this.handleError<Bikemodel>(`getBikemodel id=${id}`)));
  }

  getBikeModelReviews(id: number): Observable<BikeModelReview[]> {
    const url = `${this.bikemodelsUrl}/${id}/reviews`;
    console.log(url);
    return this.http
      .get<BikeModelReview[]>(url)
      .pipe(
        catchError(this.handleError<BikeModelReview[]>(`getBikeModel id=${id}`))
      );
  }

  updateBikeModel(bikemodel: Bikemodel): Observable<any> {
    return this.http
      .put(this.bikemodelsUrl, bikemodel, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateModel')));
  }

  deleteBikeModel(id: number): Observable<any> {
    const url = `${this.bikemodelsUrl}/${id}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError<any>('deleteModel')));
  }

  postBikeModel(bikemodel: Bikemodel): Observable<any> {
    return this.http
      .post(this.bikemodelsUrl, bikemodel, this.httpOptions)
      .pipe(catchError(this.handleError<any>('postModel')));
  }

  getBikeModelFeatures(id: number): Observable<BikeModelFeature[]> {
    const url = `${this.bikemodelsUrl}/${id}/features`;
    console.log(url);
    return this.http
      .get<BikeModelFeature[]>(url)
      .pipe(
        catchError(
          this.handleError<BikeModelFeature[]>(`getBikeModelFeature id=${id}`)
        )
      );
  }

  deleteBikeModelFeature(idBike: number, idFeature: number): Observable<any> {
    const url = `${this.bikemodelsUrl}/${idBike}/feature/${idFeature}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError<any>('deleteModel')));
  }

  postBikeFeature(
    bikemodelfeaturename: BikeModelFeature,
    bikeId: number
  ): Observable<any> {
    const url = `${this.bikemodelsUrl}/${bikeId}/feature/`;
    return this.http
      .post(url, bikemodelfeaturename, this.httpOptions)
      .pipe(catchError(this.handleError<any>('postModel')));
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
