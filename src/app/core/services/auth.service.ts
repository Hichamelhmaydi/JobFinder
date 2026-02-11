import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {user} from '../models/user.model'
import { catchError, first, last, map, switchMap, tap, throwError } from 'rxjs';
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
    this.router.navigate(['login']);
  }),
  catchError(err => {
    console.error(err);
    return throwError(() => err);
  })
);


}


login(email: string, password: string) {
  const params = new HttpParams()
    .set('email', email)
    .set('password', password);

  return this.http.get<user[]>(`${this.apiUrl}/users`, { params }).pipe(
    map(users => {
      if (users.length === 0) {
        throw new Error('Email or password incorrect'); 
      }

      const user = users[0];
      const usersave={
        id:user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email
      }
      sessionStorage.setItem('user', JSON.stringify(usersave));
      return usersave;
    }),
    tap(() => this.router.navigate(['footer'])),
    catchError(err => throwError(() => err))
  );
}


}