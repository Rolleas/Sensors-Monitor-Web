import { createReducer, on } from '@ngrx/store';

import * as authActions from './auth.actions';

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  role: string | null;
}

export const initialAuthState: AuthState = {
  token: null,
  isAuthenticated: false,
  role: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(authActions.login, (state) => ({ ...state, token: null, isAuthenticated: false })),
  on(authActions.loginSuccess, (state, { token, role }) => ({
    ...state,
    token: token,
    isAuthenticated: true,
    role: role,
  })),
  on(authActions.loginFailed, (state) => ({ ...state, token: null, isAuthenticated: false })),

  on(authActions.onLoad, (state) => ({ ...state, token: null, isAuthenticated: false })),
  on(authActions.onLoadSuccess, (state, { token, role }) => ({
    ...state,
    token: token,
    isAuthenticated: true,
    role: role,
  })),
  on(authActions.onLoadFailed, (state) => ({ ...state, token: null, isAuthenticated: false })),

  on(authActions.logout, (state) => ({ ...state })),
  on(authActions.logoutSuccess, (state) => ({ ...state, token: null, isAuthenticated: false, role: null })),
);
