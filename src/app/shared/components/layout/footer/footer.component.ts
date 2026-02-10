import { Component,inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-footer',
    templateUrl: '../footer/footer.component.html',
    standalone : true
})

export class FooterComponent {
    route = inject(ActivatedRoute);
}