import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { JobService } from '../../../core/services/job-api.service';
import { Job, JobApiResponse, JobFilters } from '../../../core/models/job.model';
import { JobSearchFormComponent } from '../components/job-search-form/job-search-form.component';
import { JobResultsComponent } from '../components/job-results/job-results.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import * as FavoritesActions from '../../../store/favorites/favorites.actions';
import * as FavoritesSelectors from '../../../store/favorites/favorites.selectors';
import * as ApplicationsActions from '../../../store/applications/applications.actions';
import * as ApplicationsSelectors from '../../../store/applications/applications.selectors';

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    JobSearchFormComponent,
    JobResultsComponent,
    PaginationComponent
  ],
  templateUrl: './job-search.component.html'
})
export class JobSearchComponent implements OnInit {
  private jobService = inject(JobService);
  private router = inject(Router);
  private store = inject(Store);
  private pendingApplications = new Set<number>();

  jobs$!: Observable<JobApiResponse>;

  favoriteIds$: Observable<number[]> = this.store.select(FavoritesSelectors.selectFavoriteOfferIds);
  applicationIds$: Observable<number[]> = this.store.select(ApplicationsSelectors.selectApplicationOfferIds);

  currentPage = 1;
  totalPages = 0;
  totalItems = 0;
  currentFilters: JobFilters = {};
  isAuthenticated = false;

  ngOnInit(): void {
    this.checkAuthentication();
    this.loadJobs({ page: 1 });

    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.store.dispatch(FavoritesActions.loadFavorites({ userId: user.id }));
      this.store.dispatch(ApplicationsActions.loadApplications({ userId: user.id }));
    }
  }

  checkAuthentication(): void {
    this.isAuthenticated = !!sessionStorage.getItem('user');
  }

  loadJobs(filters: JobFilters): void {
    this.currentFilters = { ...filters };
    this.jobs$ = this.jobService.getJobs(filters);
    this.jobs$.subscribe(response => {
      this.totalPages = response.page_count;
      this.totalItems = response.total;
      this.currentPage = response.page;
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
    this.loadJobs({ ...this.currentFilters, page });
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
    this.router.navigate(['/job', job.id]);
  }

  onAddToFavorites(job: Job): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }

    const userStr = sessionStorage.getItem('user');
    if (!userStr) return;
    const user = JSON.parse(userStr);

    this.store.select(FavoritesSelectors.selectFavoriteByOfferId(job.id))
      .pipe(take(1))
      .subscribe(fav => {
        if (fav) {
          this.store.dispatch(FavoritesActions.removeFavorite({ id: fav.id }));
        } else {
          this.store.dispatch(FavoritesActions.addFavorite({
            favorite: {
              userId: user.id,
              offerId: job.id,
              title: job.name,
              company: job.company.name,
              location: job.locations?.[0]?.name ?? 'Remote / Non spécifié',
              createdAt: new Date()
            }
          }));
        }
      });
  }

onTrackApplication(job: Job): void {
  if (!this.isAuthenticated) {
    this.router.navigate(['/login']);
    return;
  }

  const userStr = sessionStorage.getItem('user');
  if (!userStr) return;
  const user = JSON.parse(userStr);

  this.applicationIds$.pipe(take(1)).subscribe(ids => {
    if (ids.includes(job.id)) {
      this.router.navigate(['/applications']);
      return;
    }

    this.store.dispatch(ApplicationsActions.addApplication({
      application: {
        userId: user.id,
        offerId: job.id,
        title: job.name,
        company: job.company.name,
        location: job.locations?.[0]?.name ?? 'Remote / Non spécifié',
        status: 'pending',
        appliedAt: new Date(),
        updatedAt: new Date()
      }
    }));

    // ✅ Naviguer après un court délai pour laisser le serveur répondre
    setTimeout(() => this.router.navigate(['/applications']), 300);
  });
}
}