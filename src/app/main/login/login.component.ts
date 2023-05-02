import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";

declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  private auth2: any;
  hide: boolean = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.required]);
constructor() {
}

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
      console.error('Oturum açma hatası:', error);
    });
  }

  signInWithGoogle(): void {
    // Bu fonksiyonun içeriği şu anda boş, çünkü oturum açma işlemi `attachSignIn` ile başlatılıyor.
  }
}
