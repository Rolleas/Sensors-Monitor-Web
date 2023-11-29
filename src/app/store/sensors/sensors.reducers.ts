import { createReducer, on } from '@ngrx/store';

import * as sensorsActions from './sensors.actions';
import { SensorsTableModel } from '../../sensor/models/sensors-table.model';

export interface SensorsState {
  tableData: SensorsTableModel | null;
  attributes: any;
}

export const initialSensorsState: SensorsState = {
  tableData: null,
  attributes: null,
};

export const sensorsReducer = createReducer(
  initialSensorsState,
  on(sensorsActions.getSensors, (state) => ({ ...state })),
  on(sensorsActions.getSensorsSuccess, (state, action) => ({ ...state, tableData: action })),
  on(sensorsActions.getSensorsFailed, (state) => ({ ...state })),

  on(sensorsActions.createSensor, (state) => ({ ...state })),
  on(sensorsActions.createSensorSuccess, (state) => ({ ...state })),
  on(sensorsActions.createSensorFailed, (state) => ({ ...state })),

  on(sensorsActions.getAttributesSuccess, (state, { attributes }) => ({ ...state, attributes: attributes })),
);
