import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";




@Component({  

    standalone: true,
    selector: 'app-register',
    templateUrl: './register.component.html',
    imports: [ReactiveFormsModule, CommonModule] 
  
})
export class RegisterComponent  { 
    private authService = inject(AuthService)

    registerForm = new FormGroup ({
        firstName : new FormControl('',[Validators.required]),
        lastName : new FormControl('',[Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email,Validators.minLength(6)]),
        number: new FormControl('',[Validators.required]),
        country: new FormControl('',[Validators.required]),
        password : new FormControl('',[Validators.required])
    });
    
    onSubmit() {
       if(this.registerForm.valid) {
        console.log(this.registerForm.value);
        const userData = this.registerForm.value;
       } else {
        console.log('Form is invalid');
        }
    }
}