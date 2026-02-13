import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobComponent } from "../../shared/components/job-card/job-card.component";
import { HeaderComponent } from "../../shared/components/layout/headre/headre.component";
import { FooterComponent } from "../../shared/components/layout/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, JobComponent, HeaderComponent, FooterComponent],
  templateUrl:'./home.component.html'
})
export class HomeComponent {}
