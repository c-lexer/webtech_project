import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Bikecategory } from '../_dataobjects/bikecategorys';

@Injectable({ providedIn: 'root' })
export class BikecategoryService {
  private bikecategorysUrl = 'http://localhost:3000/api/bikecategorys'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET Biketypes from the server */
  getCategorys(): Observable<Bikecategory[]> {
    return this.http
      .get<Bikecategory[]>(this.bikecategorysUrl)
      .pipe(
        catchError(this.handleError<Bikecategory[]>('getBikecategorys', []))
      );
  }

  updateBikecategory(bikecategory: Bikecategory): Observable<any> {
    return this.http
      .put(this.bikecategorysUrl, bikecategory, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updatecategory')));
  }

  deleteBikecategory(id: number): Observable<any> {
    const url = `${this.bikecategorysUrl}/${id}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError<any>('deletecategory')));
  }

  postBikecategory(bikecategory: Bikecategory): Observable<Bikecategory> {
    return this.http
      .post<Bikecategory>(this.bikecategorysUrl, bikecategory, this.httpOptions)
      .pipe(catchError(this.handleError<Bikecategory>('postCategory')));
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
