import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../models/user.model';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

getUserById(id: string | number): Observable<user> {
  return this.http.get<user>(`${this.apiUrl}/users/${id}`);
}

updateUser(id: string | number, data: user): Observable<user> {
  return this.http.put<user>(`${this.apiUrl}/users/${id}`, data);
}

deleteUser(id: string | number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
}
}