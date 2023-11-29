import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { SensorService } from '../../sensor/services/sensor.service';
import * as sensorsActions from './sensors.actions';
import { SensorsTableModel } from '../../sensor/models/sensors-table.model';
import { AttributesModel } from '../../sensor/models/attributes.model';

@Injectable()
export class SensorsEffects {
  createSensor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sensorsActions.createSensor),
      exhaustMap(({ item }) => {
        return this.sensorsService.createSensor(item).pipe(
          map(() => {
            return sensorsActions.createSensorSuccess();
          }),
          catchError((error) => {
            return of(sensorsActions.createSensorFailed(error));
          }),
        );
      }),
    ),
  );

  getSensorsTable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sensorsActions.getSensors),
      exhaustMap(({ page, keyword }) => {
        return this.sensorsService.getSensorList({ page, keyword }).pipe(
          map((res: SensorsTableModel) => {
            return sensorsActions.getSensorsSuccess(res);
          }),
          catchError((error) => {
            return of(sensorsActions.getSensorsFailed(error));
          }),
        );
      }),
    ),
  );

  getAttributes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sensorsActions.getAttributes),
      exhaustMap(() => {
        return this.sensorsService.getAttributes().pipe(
          map((res: AttributesModel) => {
            return sensorsActions.getAttributesSuccess({ attributes: res });
          }),
          catchError((error) => {
            return of(sensorsActions.getAttributesFailed(error));
          }),
        );
      }),
    ),
  );

  deleteSensor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sensorsActions.deleteSensor),
      exhaustMap(({ id }) => {
        return this.sensorsService.deleteSensor(id).pipe(
          map(() => {
            return sensorsActions.deleteSensorSuccess();
          }),
          catchError((error) => {
            return of(sensorsActions.deleteSensorFailed(error));
          }),
        );
      }),
    ),
  );

  handleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          sensorsActions.getSensorsFailed,
          sensorsActions.createSensorFailed,
          sensorsActions.getAttributesFailed,
          sensorsActions.deleteSensorFailed,
        ),
        tap(({ error }) => {
          console.log(error);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly sensorsService: SensorService,
  ) {}
}
