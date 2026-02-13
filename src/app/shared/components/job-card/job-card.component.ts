import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { JobApiResponse } from '../../../core/models/job.model';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './job-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobComponent {
  @Input() jobs$: Observable<JobApiResponse> = of({
    page: 1,
    page_count: 0,
    items_per_page: 0,
    total: 0,
    results: []
  });
}