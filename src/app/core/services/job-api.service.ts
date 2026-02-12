import { HttpClient, HttpParams } from "@angular/common/http";
import { JobApiResponse } from "../models/job.model";
import { inject } from "@angular/core";
import { environment } from "../../../environments/environment.development";

export class jobService {

    private http = inject(HttpClient)
    private readonly apiUrl = environment.jobApi;
    getJobs(page: number = 1,location?: string,level?: string,category?: string) {

  let params = new HttpParams()
    .set('page', page.toString())
    .set('descending', 'true')

  if (location) {
    params = params.set('location', location);
  }

  if (level) {
    params = params.append('level', level);
  }

  if (category) {
    params = params.append('category', category);
  }

  return this.http.get<JobApiResponse>(this.apiUrl,{params});
}

}