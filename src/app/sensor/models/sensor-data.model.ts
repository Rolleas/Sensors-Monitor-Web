import { ValueModel } from './value.model';
import { Unit } from './unit.model';

export type ItemModel = {
  idSensor: string;
  name: string;
  model: string;
  rangeFrom: number;
  rangeTo: number;
  type: ValueModel;
  unit: Unit;
  location: string;
  description: string;
};
