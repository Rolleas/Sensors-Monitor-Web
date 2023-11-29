import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SensorsTableModel } from '../models/sensors-table.model';
import { environment } from '../../../environments/environment';
import { GetModel } from '../models/get.model';
import { ItemModel } from '../models/sensor-data.model';
import { AttributesModel } from '../models/attributes.model';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  constructor(private readonly httpClient: HttpClient) {}

  getSensorList(getData: GetModel): Observable<SensorsTableModel> {
    const path = `sensor/user/list`;

    return this.httpClient.post<SensorsTableModel>(environment.api + path, getData);
  }

  createSensor(item: ItemModel): Observable<any> {
    const path = 'sensor/admin/save';

    return this.httpClient.post<any>(environment.api + path, item);
  }

  deleteSensor(id: string): Observable<void> {
    const path = `sensor/admin/remove?id=${id}`;

    return this.httpClient.delete<void>(environment.api + path);
  }

  getAttributes(): Observable<AttributesModel> {
    const path = 'attributes/user';

    return this.httpClient.get<AttributesModel>(environment.api + path);
  }
}
