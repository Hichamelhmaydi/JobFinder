import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {RegisterComponent} from '../../features/auth/register/register.component';
import {user} from '../models/user.model'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  checkEmailExists (email : string){
    return this.http.get<{exists : boolean}>(`${this.apiUrl}/users`,{params:{email}});
  }
createUser(user: user) {
  return this.http.post<user>(`${this.apiUrl}/users`, user);
}
}
