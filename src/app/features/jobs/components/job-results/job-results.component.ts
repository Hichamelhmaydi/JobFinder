import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Job, JobApiResponse } from '../../../../core/models/job.model';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyPageMessageComponent } from '../empty/empty-page-message';


@Component({
  selector: 'app-job-results',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, EmptyPageMessageComponent],
  templateUrl: './job-results.component.html'
})
export class JobResultsComponent {
  @Input() jobs$: Observable<JobApiResponse> = of({
    page: 1,
    page_count: 0,
    items_per_page: 0,
    total: 0,
    results: []
  });

  @Input() isAuthenticated = false;
  @Input() favoriteIds: number[] = [];
  @Input() hasFilters = false; 

  @Output() viewDetails = new EventEmitter<Job>();
  @Output() addToFavorites = new EventEmitter<Job>();
  @Output() trackApplication = new EventEmitter<Job>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() clearFilters = new EventEmitter<void>();

  onViewDetails(job: Job): void {
    this.viewDetails.emit(job);
  }

  onAddToFavorites(job: Job): void {
    this.addToFavorites.emit(job);
  }

  onTrackApplication(job: Job): void {
    this.trackApplication.emit(job);
  }

  isFavorite(jobId: number): boolean {
    return this.favoriteIds.includes(jobId);
  }

  onNextPage(): void {
    this.nextPage.emit();
  }

  onClearFilters(): void {
    this.clearFilters.emit();
  }
}