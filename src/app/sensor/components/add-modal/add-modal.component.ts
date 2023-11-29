import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemModel } from '../../models/sensor-data.model';
import { Store } from '@ngrx/store';
import * as sensorsActions from '../../../store/sensors/sensors.actions';
import { AttributesModel } from '../../models/attributes.model';
import { CustomValidators } from '../../../core/validators/custom.validator';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnChanges {
  @Input() display: boolean = false;
  @Input() data: ItemModel = null;
  @Input() attributes: AttributesModel = null;

  @Output() onCancelEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() onOnSubmit: EventEmitter<void> = new EventEmitter<void>();

  addForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
  ) {}

  ngOnChanges(): void {
    this.addForm = this.formBuilder.group(
      {
        idSensor: [this.data?.idSensor || null],
        name: [this.data?.name || null, [Validators.required, Validators.maxLength(30)]],
        model: [this.data?.model || null, [Validators.required, Validators.maxLength(15)]],
        rangeFrom: [this.data?.rangeFrom || null, [Validators.required]],
        rangeTo: [this.data?.rangeTo || null, [Validators.required]],
        type: [this.data?.type || null, [Validators.required]],
        unit: [this.data?.unit || null, [Validators.required]],
        location: [this.data?.location || null, [Validators.maxLength(40)]],
        description: [this.data?.description || null, [Validators.maxLength(200)]],
      },
      { updateOn: 'change', validators: CustomValidators.rangeValidator },
    );
  }

  submit(): void {
    console.log(this.addForm.value);
    console.log(this.addForm.valid);
    console.log(this.addForm.controls);
    if (this.addForm.valid) {
      this.store.dispatch(sensorsActions.createSensor({ item: this.addForm.value }));
      this.onOnSubmit.emit();
    }
  }

  cancel(): void {
    this.onCancelEvent.emit();
  }
}
