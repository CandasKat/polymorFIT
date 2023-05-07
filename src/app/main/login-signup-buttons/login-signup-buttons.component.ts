import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login-signup-buttons',
  templateUrl: './login-signup-buttons.component.html',
  styleUrls: ['./login-signup-buttons.component.scss']
})
export class LoginSignupButtonsComponent implements OnInit{
  @Input() button_name="";
  @Input() isDisabled = true;

  constructor(private socialAuthService: SocialAuthService,  private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        console.log(user)
        this.onSignIn(user);
        this.router.navigate(["/home"]);
      } else {
        this.authService.setLoggedInStatus(false);
        // @ts-ignore
        this.authService.setCurrentUser(null);
      }
    });
  }

  // @ts-ignore
  onSignIn(googleUser): void {
    const id_token = googleUser.idToken;
    console.log("User ID Token:", id_token);
    const userId = parseInt(googleUser.id);
    const firstName = googleUser.firstName;
    const lastName = googleUser.lastName;
    const email = googleUser.email;
    const user = {
      id: userId,
      firstName: firstName,
      lastName: lastName,
      mail: email,
      profile: null,
    };

    this.authService.findUserByEmail(email).subscribe((existingUser) => {
      if (existingUser) {
        this.authService.setLoggedInStatus(true);
        // @ts-ignore
        this.authService.setCurrentUser({...user, profile: existingUser.profile});
        this.authService.checkUserProfile();
      } else {
        // @ts-ignore
        this.authService.registerGoogleUser(user).subscribe((registeredUser) => {
          if (registeredUser) {
            this.authService.setLoggedInStatus(true);
            this.authService.setCurrentUser(user);
            this.authService.checkUserProfile();
          } else {
            console.error("Error registering the Google user");
          }
        });
      }
    });
  }
}
