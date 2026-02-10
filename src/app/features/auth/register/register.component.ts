import { Component,inject} from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    standalone: true

})
export class RegisterComponent {
   route = inject(ActivatedRoute);
}