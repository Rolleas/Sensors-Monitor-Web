import { AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidators {
  static rangeValidator(form: FormGroup): void {
    const rangeFromControl: AbstractControl = form.get('rangeFrom');
    const rangeToControl: AbstractControl = form.get('rangeTo');

    const rangeFromValue: number = parseInt(rangeFromControl.value);
    const rangeToValue: number = parseInt(rangeToControl.value);

    if (rangeFromValue > rangeToValue) {
      rangeFromControl.setErrors({
        ...rangeFromControl.errors,
        rangeError: true,
      });
    }

    if (!CustomValidators.isInt(rangeFromValue)) {
      rangeFromControl.setErrors({
        ...rangeFromControl.errors,
        intFromError: true,
      });
    }

    if (!CustomValidators.isInt(rangeToValue)) {
      rangeFromControl.setErrors({
        ...rangeFromControl.errors,
        intToError: true,
      });
    }
  }

  private static isInt(n: number): boolean {
    return Number(n) === n && n % 1 === 0;
  }
}
