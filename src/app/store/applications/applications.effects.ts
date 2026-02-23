import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import * as ApplicationsActions from './applications.actions';
import { ApplicationService } from '../../core/services/applications-api.service';

@Injectable()
export class ApplicationsEffects {
  private actions$ = inject(Actions);
  private applicationService = inject(ApplicationService);
  private router = inject(Router);

  loadApplications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationsActions.loadApplications),
      mergeMap(({ userId }) =>
        this.applicationService.getApplications(userId).pipe(
          map(applications => ApplicationsActions.loadApplicationsSuccess({ applications })),
          catchError(error => of(ApplicationsActions.loadApplicationsFailure({ error })))
        )
      )
    )
  );

  addApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationsActions.addApplication),
      switchMap(({ application }) =>
        this.applicationService.addApplication(application).pipe(
          switchMap(added =>
            this.applicationService.getApplications(added.userId).pipe(
              map(applications => ApplicationsActions.loadApplicationsSuccess({ applications })),
              catchError(error => of(ApplicationsActions.addApplicationFailure({ error })))
            )
          ),
          catchError(error => of(ApplicationsActions.addApplicationFailure({ error })))
        )
      )
    )
  );

  updateStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationsActions.updateApplicationStatus),
      mergeMap(({ id, status }) =>
        this.applicationService.updateStatus(id, status).pipe(
          map(application => ApplicationsActions.updateApplicationStatusSuccess({ application })),
          catchError(error => of(ApplicationsActions.updateApplicationStatusFailure({ error })))
        )
      )
    )
  );

  deleteApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationsActions.deleteApplication),
      mergeMap(({ id }) =>
        this.applicationService.deleteApplication(id).pipe(
          map(() => ApplicationsActions.deleteApplicationSuccess({ id })),
          catchError(error => of(ApplicationsActions.deleteApplicationFailure({ error })))
        )
      )
    )
  );
}