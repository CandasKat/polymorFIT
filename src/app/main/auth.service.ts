import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<{ firstName: string; lastName: string } | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  constructor() { }

  setLoggedInStatus(status: boolean){
    this.isLoggedInSubject.next(status);
  }

  setCurrentUser(user: { firstName: string; lastName: string }): void {
    this.currentUserSubject.next(user);
  }
}
