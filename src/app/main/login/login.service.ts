import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(mail: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?mail=${mail}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0];
          this.authService.setLoggedInStatus(true);
          this.authService.setCurrentUser({ firstName: user.first_name, lastName: user.last_name });
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => {
        return [false];
      })
    );
  }
}
