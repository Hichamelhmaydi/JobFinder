import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application, ApplicationStatus } from '../models/application.model';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getApplications(userId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/applications?userId=${userId}`);
  }

  addApplication(application: Omit<Application, 'id'>): Observable<Application> {
    return this.http.post<Application>(`${this.apiUrl}/applications`, application);
  }

  updateStatus(id: number, status: ApplicationStatus): Observable<Application> {
    return this.http.patch<Application>(`${this.apiUrl}/applications/${id}`, {
      status,
      updatedAt: new Date()
    });
  }

  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/applications/${id}`);
  }
}