import { CommonModule } from "@angular/common";
import { Component,inject } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";




@Component({  

    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [ReactiveFormsModule, CommonModule] 
  
})
export class LoginComponent  { 
    route = inject(ActivatedRoute);
    loginForm  = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email,Validators.minLength(6)]),
        password: new FormControl('', Validators.required),
    });
    
    onSubmit() {
        return true;
    }
}