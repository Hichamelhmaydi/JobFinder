import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JobService } from '../../../core/services/job-api.service';
import { Job, JobApiResponse, JobFilters } from '../../../core/models/job.model';
import { JobSearchFormComponent } from '../components/job-search-form/job-search-form.component';
import { JobResultsComponent } from '../components/job-results/job-results.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [
    CommonModule,
    JobSearchFormComponent,
    JobResultsComponent,
    PaginationComponent
  ],
  templateUrl: './job-search.component.html'
})
export class JobSearchComponent implements OnInit {
  private jobService = inject(JobService);
  private router = inject(Router);

  jobs$!: Observable<JobApiResponse>;
  currentPage = 1;
  totalPages = 0;
  totalItems = 0;
  currentFilters: JobFilters = {};

  isAuthenticated = false;
  favoriteIds: number[] = [];

  ngOnInit(): void {
    this.checkAuthentication();
    this.loadFavorites();
    this.loadJobs({ page: 1 });
  }

  checkAuthentication(): void {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    this.isAuthenticated = !!user;
  }

  loadFavorites(): void {
    // TODO: Implémenter avec NgRx
  }

  loadJobs(filters: JobFilters): void {
    this.currentFilters = { ...filters };
    this.jobs$ = this.jobService.getJobs(filters);

    this.jobs$.subscribe(response => {
      this.totalPages = response.page_count;
      this.totalItems = response.total;
      this.currentPage = response.page;

      console.log(' Pagination:', {
        page: response.page,
        totalPages: response.page_count,
        totalItems: response.total,
        resultatsPageActuelle: response.results.length
      });
    });
  }


  hasFilters(): boolean {
    return !!(this.currentFilters.keyword || this.currentFilters.location);
  }

  onSearch(filters: JobFilters): void {
    this.loadJobs({ ...filters, page: 1 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onPageChange(page: number): void {
    const filters: JobFilters = { ...this.currentFilters, page };
    this.loadJobs(filters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.onPageChange(this.currentPage + 1);
    }
  }
  onClearFilters(): void {
    this.loadJobs({ page: this.currentPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onViewDetails(job: Job): void {
    if (job.refs?.landing_page) {
      window.open(job.refs.landing_page, '_blank');
    }
  }

  onAddToFavorites(job: Job): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }

    const index = this.favoriteIds.indexOf(job.id);
    if (index > -1) {
      this.favoriteIds.splice(index, 1);
      console.log(' Retiré des favoris:', job.name);
    } else {
      this.favoriteIds.push(job.id);
      console.log(' Ajouté aux favoris:', job.name);
    }
  }

  onTrackApplication(job: Job): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }

    console.log('Candidature suivie:', job.name);
  }
}