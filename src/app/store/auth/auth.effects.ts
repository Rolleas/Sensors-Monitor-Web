import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { AuthService } from '../../auth/services/auth.service';
import * as authActions from './auth.actions';
import { TokenModel } from '../../auth/models/token.model';
import { decodeJwt } from '../../core/functions/decodeJWT';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      exhaustMap((action) =>
        this.authService.login(action.model).pipe(
          map(({ token }: TokenModel) => {
            localStorage.setItem('token', token);
            void this.router.navigate(['/sensor']);
            const decodedJwt = decodeJwt(token);

            return authActions.loginSuccess({ token: token, role: decodedJwt.sub });
          }),
          catchError((error) => {
            return of(authActions.loginFailed(error));
          }),
        ),
      ),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logout),
      map(() => {
        localStorage.removeItem('token');
        void this.router.navigate(['auth']);

        return authActions.logoutSuccess();
      }),
    ),
  );

  onLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.onLoad),
      map(() => {
        const token = localStorage.getItem('token');

        if (token) {
          const decodedJwt = decodeJwt(token);
          void this.router.navigate(['sensor']);
          return authActions.onLoadSuccess({ token: token, role: decodedJwt.sub });
        }

        void this.router.navigate(['auth']);
        return authActions.onLoadFailed({ error: null });
      }),
    ),
  );

  handleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginFailed, authActions.onLoadFailed),
        tap(({ error }) => {
          console.log(error);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}
}
