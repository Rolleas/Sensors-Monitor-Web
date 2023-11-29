import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorTableComponent } from './components/sensor-table/sensor-table.component';
import { SensorRoutingModule } from './sensor-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [SensorTableComponent, AddModalComponent],
  imports: [
    CommonModule,
    SensorRoutingModule,
    TableModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    DialogModule,
    CardModule,
    DropdownModule,
    TooltipModule,
    InputTextareaModule,
  ],
  exports: [AddModalComponent],
})
export class SensorModule {}
