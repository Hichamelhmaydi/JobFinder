import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Application, ApplicationStatus, APPLICATION_STATUS_LABELS, APPLICATION_STATUS_COLORS } from '../../../core/models/application.model';
import * as ApplicationsActions from '../../../store/applications/applications.actions';
import * as ApplicationsSelectors from '../../../store/applications/applications.selectors';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-applications-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent],
  templateUrl: './applications-list.component.html'
})
export class ApplicationsListComponent implements OnInit {
  private store = inject(Store);

  applications$: Observable<Application[]> = this.store.select(ApplicationsSelectors.selectAllApplications);
  loading$: Observable<boolean> = this.store.select(ApplicationsSelectors.selectApplicationsLoading);
  error$: Observable<any> = this.store.select(ApplicationsSelectors.selectApplicationsError);

  selectedStatus: ApplicationStatus | null = null;

  statuses = [
    { value: 'pending' as ApplicationStatus, label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'interview' as ApplicationStatus, label: 'Entretien', color: 'bg-blue-100 text-blue-800' },
    { value: 'accepted' as ApplicationStatus, label: 'Accepté', color: 'bg-green-100 text-green-800' },
    { value: 'rejected' as ApplicationStatus, label: 'Refusé', color: 'bg-red-100 text-red-800' }
  ];

  ngOnInit(): void {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.store.dispatch(ApplicationsActions.loadApplications({ userId: user.id }));
    }
  }

  onStatusChange(id: number, event: Event): void {
    const status = (event.target as HTMLSelectElement).value as ApplicationStatus;
    if (status) {
      this.store.dispatch(ApplicationsActions.updateApplicationStatus({ id, status }));
    }
  }

  onDelete(id: number): void {
    if (confirm('Supprimer cette candidature ?')) {
      this.store.dispatch(ApplicationsActions.deleteApplication({ id }));
    }
  }

  getStatusLabel(status: ApplicationStatus): string {
    return APPLICATION_STATUS_LABELS[status];
  }

  getStatusColor(status: ApplicationStatus): string {
    return APPLICATION_STATUS_COLORS[status];
  }

  countByStatus(applications: Application[], status: ApplicationStatus): number {
    return applications.filter(a => a.status === status).length;
  }

  filterApplications(applications: Application[], status: ApplicationStatus | null): Application[] {
    if (!status) return applications;
    return applications.filter(a => a.status === status);
  }
}