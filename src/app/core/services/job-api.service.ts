import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Job, JobApiResponse, JobFilters } from '../models/job.model';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JobService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.jobApi;


  getJobs(filters: JobFilters = {}): Observable<JobApiResponse> {
    let params = new HttpParams()
      .set('page', (filters.page ?? 1).toString())
      .set('descending', 'true');



    return this.http.get<JobApiResponse>(`${this.apiUrl}/jobs`, { params }).pipe(
      map(response => {
        const filteredResults = this.filterResults(response.results, filters);


        return {
          page: response.page,
          page_count: response.page_count, 
          items_per_page: response.items_per_page,
          total: response.total,  
          results: filteredResults
        };
      })
    );
  }

 
  private filterResults(jobs: Job[], filters: JobFilters): Job[] {
    let filteredResults = jobs;

    if (filters.keyword && filters.keyword.trim() !== '') {
      const keywordLower = filters.keyword.toLowerCase().trim();
      
      filteredResults = filteredResults.filter(job => {
        const titleLower = job.name.toLowerCase();
        return titleLower.includes(keywordLower);
      });
    }

    if (filters.location && filters.location.trim() !== '') {
      const locationLower = filters.location.toLowerCase().trim();
      
      filteredResults = filteredResults.filter(job => {
        if (!job.locations || job.locations.length === 0) {
          return false;
        }

        return job.locations.some(loc => {
          const locNameLower = loc.name.toLowerCase();
          return locNameLower.includes(locationLower);
        });
      });
    }

    return filteredResults;
  }

  
  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/jobs/${id}`);
  }
}