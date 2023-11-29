import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { authReducer, AuthState } from './auth/auth.reducers';
import { sensorsReducer, SensorsState } from './sensors/sensors.reducers';

export interface State {
  authState: AuthState;
  sensorsState: SensorsState;
}

export const reducers: ActionReducerMap<State> = {
  authState: authReducer,
  sensorsState: sensorsReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
