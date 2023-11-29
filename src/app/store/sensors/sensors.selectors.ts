import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SensorsState } from './sensors.reducers';

export const sensorsSelector = createFeatureSelector<SensorsState>('sensorsState');

export const selectTableData = createSelector(sensorsSelector, (state) => state.tableData);
export const selectAttributes = createSelector(sensorsSelector, (state) => state.attributes);
