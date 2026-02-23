import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Favorite } from '../../../core/models/favorite.model';
import * as FavoritesActions from '../../../store/favorites/favorites.actions';
import * as FavoritesSelectors from '../../../store/favorites/favorites.selectors';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinnerComponent
  ],
  templateUrl: './favorites-list.component.html',
})
export class FavoritesListComponent implements OnInit {
  private store = inject(Store);

  favorites$: Observable<Favorite[]> =
    this.store.select(FavoritesSelectors.selectAllFavorites);

  loading$: Observable<boolean> =
    this.store.select(FavoritesSelectors.selectFavoritesLoading);

  error$: Observable<any> =
    this.store.select(FavoritesSelectors.selectFavoritesError);

  ngOnInit(): void {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.store.dispatch(FavoritesActions.loadFavorites({ userId: user.id }));
    }
  }

  removeFavorite(id: number): void {
    this.store.dispatch(FavoritesActions.removeFavorite({ id }));
  }
}