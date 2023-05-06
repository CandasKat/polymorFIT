import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {ProfileBottomSheetComponent} from "./profile-bottom-sheet/profile-bottom-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {UserProfile} from "../model/user.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/users';

  private currentUserProfileSubject = new BehaviorSubject<UserProfile | null>(null);
  currentUserProfile$ = this.currentUserProfileSubject.asObservable();
  private currentUserSubject = new BehaviorSubject<{ id: number, firstName: string; lastName: string, profile: UserProfile | null } | null>(null);  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  currentUser$ = this.currentUserSubject.asObservable()
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  constructor(public bottomSheet: MatBottomSheet, private http: HttpClient) { }

  setLoggedInStatus(status: boolean){
    this.isLoggedInSubject.next(status);
  }

  setCurrentUser(user: { id: number, firstName: string; lastName: string; profile: UserProfile | null }): void {
    this.currentUserSubject.next(user);
    this.currentUserProfileSubject.next(user.profile);
  }

  getCurrentUser(): { id: number, firstName: string; lastName: string, profile: UserProfile | null } | null {
    return this.currentUserSubject.value;
  }


  checkUserProfile() {
  this.currentUserProfile$.subscribe((profile) => {
    if (!this.isProfileComplete(profile)) {
      this.showProfileBottomSheet();
    }
  });
}

  showProfileBottomSheet() {
    this.bottomSheet.open(ProfileBottomSheetComponent, {
      panelClass: 'custom-bottom-sheet',
      hasBackdrop: false,
      backdropClass: 'backdrop-custom',
      disableClose: true,
    });
  }

  private isProfileComplete(profile: UserProfile | null): boolean {
    if (!profile) {
      return false;
    }

    const requiredFields: Array<keyof UserProfile> = ['sex', 'age', 'weight', 'height', 'level'];

    for (const field of requiredFields) {
      if (!profile[field]) {
        return false;
      }
    }

    return true;
  }

  updateUserProfile(userId: number, update: Partial<UserProfile>): Observable<UserProfile | null> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      console.error('User not found or profile is missing');
      return of(null);
    }

    const updatedProfile = { ...currentUser.profile, ...update };

    return this.http.patch<UserProfile>(`${this.apiUrl}/${userId}`, { profile: updatedProfile }).pipe(
      tap(() => {
        this.setCurrentUser({ ...currentUser, profile: updatedProfile });
      }),
      catchError(() => {
        return of(null);
      })
    );
  }



}
