import { createReducer, on } from '@ngrx/store';
import { Application } from '../../core/models/application.model';
import * as ApplicationsActions from './applications.actions';

export interface ApplicationsState {
  applications: Application[];
  loading: boolean;
  error: any;
}

export const initialState: ApplicationsState = {
  applications: [],
  loading: false,
  error: null
};

export const applicationsReducer = createReducer(
  initialState,

  on(ApplicationsActions.loadApplications, state => ({ ...state, loading: true, error: null })),
  on(ApplicationsActions.loadApplicationsSuccess, (state, { applications }) => ({ ...state, applications, loading: false })),
  on(ApplicationsActions.loadApplicationsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(ApplicationsActions.updateApplicationStatusSuccess, (state, { application }) => ({
    ...state,
    applications: state.applications.map(a => a.id === application.id ? application : a)
  })),

  on(ApplicationsActions.deleteApplicationSuccess, (state, { id }) => ({
    ...state,
    applications: state.applications.filter(a => a.id !== id)
  }))
);