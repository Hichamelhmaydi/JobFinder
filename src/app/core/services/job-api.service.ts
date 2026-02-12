import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Job, JobApiResponse, JobFilters } from '../models/job.model';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class JobService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.jobApi; 

  getJobs(filters: JobFilters = {}) {
    let params = new HttpParams()
      .set('page', (filters.page ?? 1).toString())
      .set('descending', 'true');

    if (filters.location) params = params.set('location', filters.location);
    if (filters.level) params = params.set('level', filters.level);
    if (filters.category) params = params.set('category', filters.category);

    return this.http.get<JobApiResponse>(`${this.apiUrl}/jobs`, { params });
  }

  getJobById(id: number) {
    return this.http.get<Job>(`${this.apiUrl}/jobs/${id}`);
  }

  searchJobs(filters: JobFilters = {}) {
    return this.getJobs(filters);
  }
}
