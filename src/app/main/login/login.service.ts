import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  login(mail: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?mail=${mail}&password=${password}`).pipe(
      map(user => {
        console.log('User:', user);
        // @ts-ignore
        return user.id;
      }),
      catchError(() => {
        return [false];
      })
    );
  }
}
