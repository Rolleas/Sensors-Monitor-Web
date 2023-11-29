import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';

export const authSelector = createFeatureSelector<AuthState>('authState');

export const selectRole = createSelector(authSelector, (state) => state.role);
export const selectIsAuthenticated = createSelector(authSelector, (state) => state.isAuthenticated);
