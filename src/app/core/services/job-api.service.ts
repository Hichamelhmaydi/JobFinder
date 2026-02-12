import { HttpClient, HttpParams } from "@angular/common/http";
import { JobApiResponse } from "../models/job.model";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";

export interface JobFilters {
  page?: number;
  location?: string;
  level?: string;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {

    private http = inject(HttpClient);
    private readonly apiUrl = environment.jobApi;

    getJobs(filters: JobFilters = {}) {
        let params = new HttpParams()
            .set('page', (filters.page ?? 1).toString())
            .set('descending', 'true');

        if (filters.location) {
            params = params.set('location', filters.location);
        }

        if (filters.level) {
            params = params.set('level', filters.level);
        }

        if (filters.category) {
            params = params.set('category', filters.category);
        }

        return this.http.get<JobApiResponse>(this.apiUrl, { params });
    }
}
