import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";




@Component({  

    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [ReactiveFormsModule, CommonModule] 
  
})
export class LoginComponent  { 
    loginForm  = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email,Validators.minLength(6)]),
        password: new FormControl('', Validators.required),
    });
    
    onSubmit() {
       if(this.loginForm.valid) {
        console.log(this.loginForm.value);
       } else {
        console.log('Form is invalid');
        }
    }
}