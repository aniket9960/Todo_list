import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { customEmailValidator } from '../validators/validator';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthServiceService]
})
export class LoginComponent {


  constructor(private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    public snackBar: MatSnackBar,
    private route: Router
  ) { }

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  },
    {
      validator: [customEmailValidator('username')]
    });

  successSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  errorSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['centered-snackbar', 'error-snackbar']
    });
  }


  onsubmit() {
    alert(this.loginForm.value.username);
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: (response: any) => {
        console.log(response.message);
        this.successSnackBar(response.message);
        sessionStorage.setItem('isLoggedIn', 'true');
        this.route.navigate(['/todoList']);
      },
      error: (error: any) => {
        //alert("Error :" + error.error.message);
        sessionStorage.setItem('isLoggedIn', 'false');
        this.errorSnackBar(error.error.message);
      }
    });

  }

  passwordFieldType: string = 'password';

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

}
