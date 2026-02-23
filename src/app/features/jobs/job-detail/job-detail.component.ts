import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { JobService } from '../../../core/services/job-api.service';
import { Job } from '../../../core/models/job.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent],
  templateUrl: './job-detail.component.html'
})
export class JobDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private jobService = inject(JobService);

  job$!: Observable<Job>;
  isAuthenticated = false;
  favoriteIds: number[] = []; 

  ngOnInit(): void {
    this.job$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.jobService.getJobById(id);
      })
    );

    this.checkAuthentication();
    this.loadFavorites(); 
  }

  checkAuthentication(): void {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    this.isAuthenticated = !!user;
  }

  loadFavorites(): void {
    const stored = localStorage.getItem('favorites');
    this.favoriteIds = stored ? JSON.parse(stored) : [];
  }

  isFavorite(jobId: number): boolean {
    return this.favoriteIds.includes(jobId);
  }

  addToFavorites(job: Job): void {
    if (!this.isAuthenticated) return;
    console.log('Ajouter aux favoris (NgRx)', job);
  }

  removeFromFavorites(jobId: number): void {
    console.log('Retirer des favoris (NgRx)', jobId);
  }

  trackApplication(job: Job): void {
    if (!this.isAuthenticated) return;
    console.log('Suivre cette candidature', job);
  }

  openOriginalUrl(url: string): void {
    window.open(url, '_blank');
  }
}