import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobComponent } from "../../shared/components/job-card/job-card.component";
import { HeaderComponent } from "../../shared/components/layout/headre/headre.component";
import { FooterComponent } from "../../shared/components/layout/footer/footer.component";
import { Observable } from 'rxjs';
import { JobApiResponse } from '../../core/models/job.model';
import { JobService } from '../../core/services/job-api.service';
import {PaginationComponent} from '../../shared/components/pagination/pagination.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, JobComponent, HeaderComponent, FooterComponent,PaginationComponent],
  templateUrl:'./home.component.html'
})
export class HomeComponent {
   private jobService = inject(JobService);

  currentPage = 1;
  totalPages = 0;
  totalItems = 0;

  jobs$!: Observable<JobApiResponse>;

  ngOnInit() {
    this.loadJobs(this.currentPage);
  }

  loadJobs(page: number): void {
    this.jobs$ = this.jobService.getJobs({ page });
    
    this.jobs$.subscribe(response => {
      this.totalPages = response.page_count;
      this.totalItems = response.total;
      this.currentPage = response.page;
    });
  }

  onPageChange(page: number): void {
    this.loadJobs(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
