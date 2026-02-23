import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.reducer';
import {Favorite} from '../../core/models/favorite.model'

export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

export const selectAllFavorites = createSelector(selectFavoritesState, state => state.favorites);
export const selectFavoritesLoading = createSelector(selectFavoritesState, state => state.loading);
export const selectFavoritesError = createSelector(selectFavoritesState, state => state.error);

export const selectFavoriteOfferIds = createSelector(selectAllFavorites, favorites => favorites.map(f => f.offerId));

export const selectFavoriteEntities = createSelector(selectAllFavorites, favorites =>
  favorites.reduce((acc, fav) => ({ ...acc, [fav.offerId]: fav }), {} as Record<number, Favorite>)
);

export const selectFavoriteByOfferId = (offerId: number) =>
  createSelector(selectFavoriteEntities, entities => entities[offerId]);