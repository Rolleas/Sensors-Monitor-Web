import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as sensorsActions from '../../../store/sensors/sensors.actions';
import { SensorsTableModel } from '../../models/sensors-table.model';
import { selectAttributes, selectTableData } from '../../../store/sensors/sensors.selectors';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TableLazyLoadEvent } from 'primeng/table';
import { ItemModel } from '../../models/sensor-data.model';
import { selectRole } from '../../../store/auth/auth.selectors';
import { AttributesModel } from '../../models/attributes.model';

@Component({
  selector: 'app-sensor-table',
  templateUrl: './sensor-table.component.html',
  styleUrls: ['./sensor-table.component.scss'],
})
export class SensorTableComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject();
  sensors: Observable<SensorsTableModel> = new Observable<SensorsTableModel>();
  role: Observable<string> = new Observable<string>();
  attributes: Observable<AttributesModel> = new Observable<AttributesModel>();
  page = 1;
  total = 0;
  loading: boolean = true;
  keyword: string = '';
  display = false;
  selectedValue: ItemModel = null;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.loading = true;

    this.store.dispatch(sensorsActions.getSensors({ page: this.page }));
    this.store.dispatch(sensorsActions.getAttributes());

    this.sensors = this.store.select(selectTableData).pipe(takeUntil(this.destroy$));
    this.attributes = this.store.select(selectAttributes).pipe(takeUntil(this.destroy$));
    this.role = this.store.select(selectRole).pipe(takeUntil(this.destroy$));

    this.sensors.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data) {
        this.total = data.totalContent;
      }
    });

    this.loading = false;
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.next();
  }

  onLazyLoad($event: TableLazyLoadEvent): void {
    this.loading = true;
    this.page = $event.first / 4 + 1;
    this.store.dispatch(sensorsActions.getSensors({ page: this.page }));
    this.loading = false;
  }

  onSearch(): void {
    this.loading = true;
    this.store.dispatch(sensorsActions.getSensors({ page: this.page, keyword: this.keyword }));
    this.loading = false;
  }

  onSubmit(): void {
    this.store.dispatch(sensorsActions.getSensors({ page: this.page }));
    this.display = false;
    this.selectedValue = null;
  }

  showDialog(): void {
    this.display = true;
  }

  onRowEdit(sensor: ItemModel): void {
    this.selectedValue = sensor;
    this.showDialog();
  }

  onRowDelete(sensor: ItemModel): void {
    this.store.dispatch(sensorsActions.deleteSensor({ id: sensor.idSensor }));
    this.onSubmit();
  }

  onCancel() {
    this.display = false;
    this.selectedValue = null;
  }
}
