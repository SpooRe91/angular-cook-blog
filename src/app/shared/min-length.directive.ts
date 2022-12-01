import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appMinLength]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MinLengthDirective,
      multi: true
    }
  ]
})
export class MinLengthDirective implements Validator {

  @Input() appMinLength: number | undefined;

  constructor() { }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (
      this.appMinLength === undefined ||
      (control.value?.length || 0) >= this.appMinLength) {
      return null;
    }
    return {
      appMinLength: this.appMinLength
    };
  }
}
