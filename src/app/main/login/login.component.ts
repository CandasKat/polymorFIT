import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  private mail = "";
  private password = "";
  hide: boolean = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.required]);
  @Output() close = new EventEmitter();
  constructor(private router: Router, private loginService: LoginService) {}
  cancel() {
    this.router.navigate(['/home']);
  }
  onSubmit(): void {
    this.loginService.login(this.mail, this.password).subscribe(result => {
    if (result) {

      console.log('Connection réussi');

      } else {


      }
    } ,
    error => {
      console.error('Error:', error);
    });
  }
}


