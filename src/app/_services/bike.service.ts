import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Bike } from '../_dataobjects/bike';

@Injectable({ providedIn: 'root' })
export class BikeService {
  private bikesUrl = 'http://localhost:3000/api/bikes'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET Bikes from the server */
  getBikes(): Observable<Bike[]> {
    return this.http
      .get<Bike[]>(this.bikesUrl)
      .pipe(catchError(this.handleError<Bike[]>('getBikess', [])));
  }

  /** GET getBike by id. Will 404 if id not found */
  getBike(id: number): Observable<Bike> {
    const url = `${this.bikesUrl}/${id}`;
    return this.http
      .get<Bike>(url)
      .pipe(catchError(this.handleError<Bike>(`bikesUrl id=${id}`)));
  }

  updateBike(bike: Bike): Observable<any> {
    return this.http.put(this.bikesUrl, bike, this.httpOptions);
  }

  deleteBike(id: number): Observable<any> {
    const url = `${this.bikesUrl}/${id}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError<any>('deleteBike')));
  }

  postBike(bike: Bike): Observable<Bike> {
    return this.http.post<Bike>(this.bikesUrl, bike, this.httpOptions);
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
