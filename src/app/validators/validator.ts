import { FormGroup } from "@angular/forms";


export const customNameValidator = (controlName : string) => {
    return (formGroup : FormGroup) => {
      let control = formGroup.controls[controlName];
      const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    
    if(control.errors && !control.errors['customNameValidator']){
      return;
    }

    if(!nameRegex.test(control.value)){
      control.setErrors({customNameValidator : true})
    }else{
      control.setErrors(null);
    }
    }
  };

  export const customEmailValidator = (controlName : string ) => {
    return (formGroup : FormGroup) => {
      let control = formGroup.controls[controlName];

      if(control.errors && !control.errors['customNameValidator']){
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (control.value && !emailRegex.test(control.value)) {
          control.setErrors({customEmailValidator : true});
      }
      else{
        control.setErrors(null);
      }
  
    }
  };

export const passwordValidator = (controlName: string)=> {
  return (formGroup : FormGroup) => {
    const control = formGroup.controls[controlName];
    const password = control.value;

  if(control.errors && !control.errors['minLength'] && !control.errors['passwordRequirements'])
    return;
  
  // Password length validation
  if (password && password.length < 8) {
      control.setErrors({'passwordValidator' : true});
  }

  // Password complexity validation (e.g., requiring at least one digit and one special character)
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasNumber || !hasSpecial) {
      control.setErrors({ 'passwordRequirement': true });
  }

  }
};

export const confirmPasswordValidator = (controlName : string, ControlNameToMatch : string) => {
  return (formGroup : FormGroup) => {
    let control = formGroup.controls[controlName];
    let controlToMatch = formGroup.controls[ControlNameToMatch];

    if(controlToMatch.errors && !controlToMatch.errors['confirmPasswordValidator']){
      return;
    }
    if(control.value !== controlToMatch.value){
      controlToMatch.setErrors({confirmPasswordValidator : true});
    }else{
      controlToMatch.setErrors(null);
    }
  }
}
