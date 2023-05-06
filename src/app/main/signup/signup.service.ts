import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";

interface User {
  mail: string;
  password: string;
  first_name: string;
  last_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private readonly apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
  }

  signup(mail: string, password: string, first_name: string, last_name: string): Observable<User | null> {
    const new_user: User = {
      mail,
      password,
      first_name,
      last_name,
    };

    return this.http.post<User>(`${this.apiUrl}/`, new_user).pipe(
      tap(user => {
        console.log('User:', user);
        // @ts-ignore
        if (user && user.id) {
          console.log("User added");
        }
        else {
          console.log("User not added");
        }
      }),
      catchError(() => {
        return of(null);
      })
    );
  }
}

