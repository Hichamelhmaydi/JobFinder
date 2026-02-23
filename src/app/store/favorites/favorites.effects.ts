import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as FavoritesActions from './favorites.actions';
import { FavoriteService } from '../../core/services/favorites-api.service';

@Injectable()
export class FavoritesEffects {
  private actions$ = inject(Actions);
  private favoriteService = inject(FavoriteService);

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.loadFavorites),
      mergeMap(({ userId }) =>
        this.favoriteService.getFavorites(userId).pipe(
          map(favorites => FavoritesActions.loadFavoritesSuccess({ favorites })),
          catchError(error => of(FavoritesActions.loadFavoritesFailure({ error })))
        )
      )
    )
  );

  addFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.addFavorite),
      mergeMap(({ favorite }) =>
        this.favoriteService.addFavorite(favorite).pipe(
          map(added => FavoritesActions.addFavoriteSuccess({ favorite: added })),
          catchError(error => of(FavoritesActions.addFavoriteFailure({ error })))
        )
      )
    )
  );

  removeFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.removeFavorite),
      mergeMap(({ id }) =>
        this.favoriteService.removeFavorite(id).pipe(
          map(() => FavoritesActions.removeFavoriteSuccess({ id })),
          catchError(error => of(FavoritesActions.removeFavoriteFailure({ error })))
        )
      )
    )
  );
}