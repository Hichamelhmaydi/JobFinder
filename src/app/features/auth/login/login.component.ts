import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { email } from "@angular/forms/signals";




@Component({  

    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [ReactiveFormsModule, CommonModule] 
  
})
export class LoginComponent  { 
    private authService = inject(AuthService);
    private fb = inject(FormBuilder);

    loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
    });

    
    onSubmit() {
    if(this.loginForm.invalid)return;
    let loginData = this.loginForm.getRawValue();
    this.authService.login(loginData.email,loginData.password).subscribe({
       next: (user) => {
        console.log('Login success', user);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    })
    }
}