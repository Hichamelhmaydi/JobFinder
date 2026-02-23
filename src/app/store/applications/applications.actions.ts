import { createAction, props } from '@ngrx/store';
import { Application, ApplicationStatus } from '../../core/models/application.model';

export const loadApplications = createAction(
  '[Applications] Load Applications',
  props<{ userId: number }>()
);
export const loadApplicationsSuccess = createAction(
  '[Applications] Load Applications Success',
  props<{ applications: Application[] }>()
);
export const loadApplicationsFailure = createAction(
  '[Applications] Load Applications Failure',
  props<{ error: any }>()
);

export const addApplication = createAction(
  '[Applications] Add Application',
  props<{ application: Omit<Application, 'id'> }>()
);
export const addApplicationSuccess = createAction(
  '[Applications] Add Application Success',
  props<{ application: Application }>()
);
export const addApplicationFailure = createAction(
  '[Applications] Add Application Failure',
  props<{ error: any }>()
);

export const updateApplicationStatus = createAction(
  '[Applications] Update Status',
  props<{ id: number; status: ApplicationStatus }>()
);
export const updateApplicationStatusSuccess = createAction(
  '[Applications] Update Status Success',
  props<{ application: Application }>()
);
export const updateApplicationStatusFailure = createAction(
  '[Applications] Update Status Failure',
  props<{ error: any }>()
);

export const deleteApplication = createAction(
  '[Applications] Delete Application',
  props<{ id: number }>()
);
export const deleteApplicationSuccess = createAction(
  '[Applications] Delete Application Success',
  props<{ id: number }>()
);
export const deleteApplicationFailure = createAction(
  '[Applications] Delete Application Failure',
  props<{ error: any }>()
);