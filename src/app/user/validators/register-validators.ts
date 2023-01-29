import { AbstractControl, ValidationErrors , ValidatorFn} from '@angular/forms';
export class RegisterValidators {

  /**
   * If the password and confirm_password controls are present, and the values are not equal, return an
   * error object with a noMatch property set to true
   * @param {AbstractControl} group - AbstractControl
   * @returns an object with a key of noMatch and a value of true.
   */
  static match(controlName: string, matchingControlName: string): ValidatorFn {
    /* Getting the password and confirm_password controls from the form group. */
    return (group: AbstractControl): ValidationErrors | null=>{
        const control = group.get(controlName);
        const matchingControl = group.get(matchingControlName);
    
        if (!control || !matchingControl) {
          console.log('Form controls can not be found in the form group.')
          return { controlNotFound: false };
        }
    
        const error =
          control.value === matchingControl.value ? null : { noMatch: true };
        
        /* Setting the error on the matching control. */
        matchingControl.setErrors(error);
        
        return error;
    }
  }
}
