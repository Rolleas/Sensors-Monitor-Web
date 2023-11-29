import { createAction, props } from '@ngrx/store';
import { LoginModel } from '../../auth/models/login.model';
import { HttpErrorResponse } from '@angular/common/http';

export const login = createAction('[AUTH] Login', props<{ model: LoginModel }>());
export const loginSuccess = createAction('[AUTH] Login Success', props<{ token: string; role: string }>());
export const loginFailed = createAction('[AUTH] Login Failed', props<{ error: HttpErrorResponse }>());

export const onLoad = createAction('[AUTH] On Load');
export const onLoadSuccess = createAction('[AUTH] On Load Success', props<{ token: string; role: string }>());
export const onLoadFailed = createAction('[AUTH] On Load Failed', props<{ error: HttpErrorResponse }>());

export const logout = createAction('[AUTH] Logout');
export const logoutSuccess = createAction('[AUTH] Logout Success');
