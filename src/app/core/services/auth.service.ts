import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  checkEmailIsExists (email : string){
    return this.http.get<{exists : boolean}>(`${this.apiUrl}/auth/check-email`),{params:{email}};
  }
  
}
