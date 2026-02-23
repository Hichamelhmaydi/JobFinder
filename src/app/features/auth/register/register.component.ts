import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { NonNullableFormBuilder } from '@angular/forms';




@Component({  

    standalone: true,
    selector: 'app-register',
    templateUrl: './register.component.html',
    imports: [ReactiveFormsModule, CommonModule] 
  
})
export class RegisterComponent  { 
    private authService = inject(AuthService)

    private fb = inject(NonNullableFormBuilder);

registerForm = this.fb.group({
  firstName: ['', [Validators.required, Validators.minLength(4)]],
  lastName:  ['', [Validators.required, Validators.minLength(4)]],
  email:     ['', [Validators.required, Validators.email, Validators.minLength(6)]],
  number:    ['', [Validators.required, Validators.minLength(10)]],
  country:   ['', [Validators.required, Validators.minLength(3)]],
  password:  ['', [Validators.required, Validators.minLength(8)]]
});
    
    onSubmit() {
    if (this.registerForm.invalid) return;

    const userData = this.registerForm.getRawValue();

    this.authService.register(userData).subscribe({
        next: (createdUser) => {
        console.log('Registration successful', createdUser);
        this.registerForm.reset();
        },
        error: (err) => {
        console.error('Registration failed', err.message);
        }
    });
    }

}