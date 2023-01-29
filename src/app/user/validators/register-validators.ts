import { AbstractControl, ValidationErrors } from '@angular/forms';
export class RegisterValidators {

  /**
   * If the password and confirm_password controls are present, and the values are not equal, return an
   * error object with a noMatch property set to true
   * @param {AbstractControl} group - AbstractControl
   * @returns an object with a key of noMatch and a value of true.
   */
  static match(group: AbstractControl): ValidationErrors | null {
    /* Getting the password and confirm_password controls from the form group. */
    const control = group.get('password');
    const matchingControl = group.get('confirm_password');

    if (!control || !matchingControl) {
      return { controlNotFound: false };
    }

    const error =
      control.value === matchingControl.value ? null : { noMatch: true };

    return error;
  }
}
