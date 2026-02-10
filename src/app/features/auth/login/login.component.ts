import { Component,inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";




@Component({  

    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
  
})
export class LoginComponent { 
    route = inject(ActivatedRoute);
}