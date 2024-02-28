import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../_dataobjects/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersUrl = 'http://localhost:3000/api/users'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  updateUser(user: User): Observable<any> {
    return this.http
      .put(this.usersUrl, user, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateUser')));
  }

  getUser(name: string): Observable<User> {
    const url = `${this.usersUrl}/${name}`;
    return this.http
      .get<User>(url)
      .pipe(catchError(this.handleError<User>(`getUser id=${name}`)));
  }

  deleteUser(user: User): Observable<any> {
    const url = `${this.usersUrl}/${user.name}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError<any>('deleteUser')));
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
