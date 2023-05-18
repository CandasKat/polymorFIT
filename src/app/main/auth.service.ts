import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, tap} from "rxjs";
import {ProfileBottomSheetComponent} from "./profile-bottom-sheet/profile-bottom-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {User, UserProfile} from "../model/user.model";
import {HttpClient} from "@angular/common/http";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {Workouts} from "../model/exercice.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000';

  private currentUserProfileSubject = new BehaviorSubject<UserProfile | null>(null);
  currentUserProfile$ = this.currentUserProfileSubject.asObservable();
  private currentUserSubject = new BehaviorSubject<{
    id: number,firstName: string; lastName: string, profile: UserProfile | null
  } | null>(null);

  currentUser$ = this.currentUserSubject.asObservable()
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  constructor(private socialAuthService: SocialAuthService,
              public bottomSheet: MatBottomSheet,
              private http: HttpClient) { }

  setLoggedInStatus(status: boolean){
    this.isLoggedInSubject.next(status);
  }

  setCurrentUser(user: { id?: number, firstName: string; lastName: string; profile: UserProfile | null } | null): void {
    if (user) {
      // @ts-ignore
      this.currentUserSubject.next(user);
      this.currentUserProfileSubject.next(user.profile);
    } else {
      this.currentUserSubject.next(null);
      // this.currentUserProfileSubject.next(null);
    }
  }


  getCurrentUser(): { id: number, firstName: string; lastName: string, profile: UserProfile | null } | null {
    return this.currentUserSubject.value;
  }


  checkUserProfile() {
  // @ts-ignore
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

    const requiredFields: Array<keyof UserProfile> = ['sex', 'age', 'weights', 'height', 'level'];

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

    return this.http.patch<UserProfile>(`${this.apiUrl}/users/${userId}`, { profile: updatedProfile }).pipe(
      tap(() => {
        this.setCurrentUser({ ...currentUser, profile: updatedProfile });
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  registerGoogleUser(user: {
    id: null;
    firstName: string;
    lastName: string;
    mail: string;
    profile: UserProfile | null;
  }): Observable<User | null> {
    const newUser: User = {
      id: null,
      mail: user.mail,
      password: null,
      first_name: user.firstName,
      last_name: user.lastName,
      profile: user.profile,
    };

    return this.http.post<User>(`${this.apiUrl}/users`, newUser).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }


  findUserByEmail(email: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}/users?mail=${email}`).pipe(
      map((users) => (users.length > 0 ? users[0] : null)),
      catchError(() => {
        return of(null);
      })
    );
  }
  logout(): void {
    this.setLoggedInStatus(false);
    // @ts-ignore
    this.setCurrentUser(null);
    this.socialAuthService.signOut();
  }

  saveWorkoutData(workout: Workouts): Observable<Workouts> | any {
    return this.http.post(`${this.apiUrl}/workouts`, workout);
  }

  getWorkoutData(userId: number) {
    return this.http.get(`${this.apiUrl}/workouts?userId=${userId}`);
  }

}
