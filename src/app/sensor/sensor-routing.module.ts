import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorTableComponent } from './components/sensor-table/sensor-table.component';

const routes: Routes = [
  { path: '', component: SensorTableComponent },
  { path: '**', redirectTo: 'sensor', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SensorRoutingModule {}
