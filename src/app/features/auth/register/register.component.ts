import { Component,inject} from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, RedirectCommand } from "@angular/router";
import { CommonModule } from '@angular/common';
import { reduce } from "rxjs";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule] 

})
export class RegisterComponent  {
   route = inject(ActivatedRoute);

    registerForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email,Validators.minLength(6)]),
        number: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });
    onSubmit() {
        if (this.registerForm.valid) {
            console.log(this.registerForm.value);
        } else {
            console.log('Form is invalid');
        }
    }
    
}