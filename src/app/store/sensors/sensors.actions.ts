import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { SensorsTableModel } from '../../sensor/models/sensors-table.model';
import { GetModel } from '../../sensor/models/get.model';
import { ItemModel } from '../../sensor/models/sensor-data.model';
import { AttributesModel } from '../../sensor/models/attributes.model';

export const getSensors = createAction('[SENSORS] Get Sensors', props<GetModel>());
export const getSensorsSuccess = createAction('[SENSORS] Get Sensors Success', props<SensorsTableModel>());
export const getSensorsFailed = createAction('[SENSORS] Get Sensors Failed', props<{ error: HttpErrorResponse }>());

export const createSensor = createAction('[SENSORS] Create Sensor', props<{ item: ItemModel }>());
export const createSensorSuccess = createAction('[SENSORS] Create Sensor Success');
export const createSensorFailed = createAction('[SENSORS] Create Sensor Failed', props<{ error: HttpErrorResponse }>());

export const deleteSensor = createAction('[SENSORS] Delete Sensor', props<{ id: string }>());
export const deleteSensorSuccess = createAction('[SENSORS] Delete Sensor Success');
export const deleteSensorFailed = createAction('[SENSORS] Delete Sensor Failed', props<{ error: HttpErrorResponse }>());

export const getAttributes = createAction('[SENSORS] Get Attributes');
export const getAttributesSuccess = createAction(
  '[SENSORS] Get Attributes Success',
  props<{ attributes: AttributesModel }>(),
);
export const getAttributesFailed = createAction(
  '[SENSORS] Get Attributes Failed',
  props<{ error: HttpErrorResponse }>(),
);
