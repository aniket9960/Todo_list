import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { confirmPasswordValidator, customEmailValidator, customNameValidator, passwordValidator } from '../validators/validator';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [AuthServiceService]
})
export class RegisterComponent{

  constructor(private formBuilder: FormBuilder, 
              private authService : AuthServiceService,
              public snackBar : MatSnackBar,
              private router : Router 
            ) { }
  
  regForm = this.formBuilder.group({
    fname: ['', [Validators.required]],
    lname: ['', [Validators.required]],
    mobileN: ['', [Validators.required]],
    emailid: ['', [Validators.required]],
    password: ['', [Validators.required]],
    cpassword: ['', [Validators.required]]
  },
    {
      validator: [customEmailValidator('emailid'), passwordValidator('password'), confirmPasswordValidator('password', 'cpassword'), customNameValidator('fname'), customNameValidator('lname')]

    }
  );

  successSnackBar(message:string){
    this.snackBar.open(message,'Close',{
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  errorSnackBar(message : string){
    this.snackBar.open(message,'Close',{
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['centered-snackbar','error-snackbar']
    });
  }

  observerRegister = {
    next: (response: any) => {
      this.successSnackBar('Registration successful');
      console.log(response);
      this.router.navigate(['/login']);
    },
    error: (error: any) => {
      console.log('Error is : ', error);
      //alert('Exists '+error.error.mailExists)
      if(error.error.mailExists){
        this.errorSnackBar('Mail Already Exists !');
      }else{
        this.errorSnackBar(error.error.err);
      }
    },
    complete: () => {
      // Optionally handle completion if needed
    }
  };

  onSubmit() {
    console.log(this.regForm.value);
    this.authService.register(this.regForm.value).subscribe(this.observerRegister);
  }

  passwordFieldType: string = 'password';

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
