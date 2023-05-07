import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {AuthService} from "../auth.service";
import {User, UserProfile} from "../../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private readonly apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  signup(
    mail: string,
    password: string,
    first_name: string,
    last_name: string,
    profile: UserProfile | null,
    googleUser: boolean = false
  ): Observable<User | null> {
    const new_user: User = {
      id: null,
      mail,
      password,
      first_name,
      last_name,
      profile,
    };
    if (googleUser) {
      delete new_user.password;
    }

    return this.http.post<User>(`${this.apiUrl}/`, new_user).pipe(
      tap(user => {
        console.log('User:', user);
        if (user && user.id) {
          console.log("User added");
          this.authService.setLoggedInStatus(true);
          this.authService.setCurrentUser({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            profile: user.profile || null,
          });
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

