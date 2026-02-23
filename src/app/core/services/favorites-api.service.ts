import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorite } from '../models/favorite.model';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getFavorites(userId: number): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.apiUrl}/favorites?userId=${userId}`);
  }

  addFavorite(favorite: Omit<Favorite, 'id'>): Observable<Favorite> {
    return this.http.post<Favorite>(`${this.apiUrl}/favorites`, favorite);
  }

  removeFavorite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/favorites/${id}`);
  }
}