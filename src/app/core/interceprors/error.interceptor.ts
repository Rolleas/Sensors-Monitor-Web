import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';

import * as authActions from '../../store/auth/auth.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
              this.store.dispatch(authActions.logout());
              return throwError(() => error);
          }
        }

        return throwError(() => error);
      }),
    );
  }
}
