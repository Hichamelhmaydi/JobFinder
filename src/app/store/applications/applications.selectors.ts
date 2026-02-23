import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationsState } from './applications.reducer';
import { ApplicationStatus } from '../../core/models/application.model';

export const selectApplicationsState = createFeatureSelector<ApplicationsState>('applications');

export const selectAllApplications = createSelector(selectApplicationsState, state => state.applications);
export const selectApplicationsLoading = createSelector(selectApplicationsState, state => state.loading);
export const selectApplicationsError = createSelector(selectApplicationsState, state => state.error);

export const selectApplicationOfferIds = createSelector(
  selectAllApplications,
  applications => applications.map(a => a.offerId)
);

export const selectApplicationByOfferId = (offerId: number) =>
  createSelector(selectAllApplications, apps => apps.find(a => a.offerId === offerId));

export const selectApplicationsByStatus = (status: ApplicationStatus) =>
  createSelector(selectAllApplications, apps => apps.filter(a => a.status === status));

export const selectApplicationsCount = createSelector(selectAllApplications, apps => apps.length);