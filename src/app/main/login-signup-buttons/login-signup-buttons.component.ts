import {Component, Input, OnInit} from '@angular/core';

declare const gapi: any;

@Component({
  selector: 'app-login-signup-buttons',
  templateUrl: './login-signup-buttons.component.html',
  styleUrls: ['./login-signup-buttons.component.scss']
})
export class LoginSignupButtonsComponent implements OnInit{
  @Input() button_name="";
  private auth2: any;
  ngOnInit() {
    this.loadGoogleAuthApi();
  }

  loadGoogleAuthApi() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '724653378617-00kp4ave75skimric5bvqn3o3rr66pto.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      });

      this.attachSignIn(document.getElementById('google-signin-button'));
    });
  }

  attachSignIn(element: any) {
    this.auth2.attachClickHandler(element, {}, (googleUser: any) => {
      console.log('Oturum açan kullanıcı:', googleUser);
    }, (error: any) => {
      console.error('Login Error:', error);
    });
  }

  signInWithGoogle(): void {
    // Bu fonksiyonun içeriği şu anda boş, çünkü oturum açma işlemi `attachSignIn` ile başlatılıyor.
  }
}
