import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageService } from '../_services/storage.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    if (this.storage.isLoggedIn()) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${this.storage.getToken()}` },
      });
    }

    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
