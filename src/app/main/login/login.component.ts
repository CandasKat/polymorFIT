import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  mail = "";
  password = "";
  hide: boolean = true;
  errorMessage: string | null = null;
  rememberMeChecked: boolean = false;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.required]);
  @Output() close = new EventEmitter();
  constructor(private router: Router, private loginService: LoginService) {}
  cancel() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    const rememberedUser = localStorage.getItem('rememberMe');
    if (rememberedUser) {
      this.mail = rememberedUser;
    }
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.loginService.loginSer(this.mail, this.password).subscribe(result => {
    if (result) {
      if (this.rememberMeChecked) {
        localStorage.setItem('rememberMe', this.mail);
      }
      this.router.navigate(["/home"]);
      } else {
      this.errorMessage = "Incorrect username or password";
      }
    } ,
    error => {
      console.error('Error:', error);
      this.errorMessage = "Something went wrong. Please try again later.";
    });
  }
}


