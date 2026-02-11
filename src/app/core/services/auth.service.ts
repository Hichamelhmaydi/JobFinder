import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {user} from '../models/user.model'
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private router = inject(Router);

  checkEmailExists (email : string){
    return this.http.get<user[]>(`${this.apiUrl}/users`,{params:{email}});
  }
createUser(user: user) {
  return this.http.post<user>(`${this.apiUrl}/users`, user);
}

register(user: user) {
return this.checkEmailExists(user.email).pipe(
  switchMap(res => {
    if (res.length > 0) {return throwError(() => new Error('Email already exists'));}
    return this.createUser(user);
  }),
  tap(createdUser => {
    const saveUser = {id: createdUser.id,email: createdUser.email,name: createdUser.firstName};
    sessionStorage.setItem('user', JSON.stringify(saveUser));
    this.router.navigate(['login']);
  }),
  catchError(err => {
    console.error(err);
    return throwError(() => err);
  })
);


}


}