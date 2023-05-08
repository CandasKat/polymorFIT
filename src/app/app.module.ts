import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./main/login/login.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {HeaderComponent} from "./navigation/header/header.component";
import { RoutingModule } from './routing/routing.module';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatLineModule, MatNativeDateModule} from "@angular/material/core";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import { SignupComponent } from './main/signup/signup.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { LoginSignupButtonsComponent } from './main/login-signup-buttons/login-signup-buttons.component';
import { MainBottomSheetComponent } from './main/main-bottom-sheet/main-bottom-sheet.component';
import { LoginBottomSheetComponent } from './main/login/login-bottom-sheet/login-bottom-sheet.component';
import { SignupBottomsheetComponent } from './main/signup/signup-bottomsheet/signup-bottomsheet.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCarouselModule } from '@magloft/material-carousel';
import {HttpClientModule} from "@angular/common/http";
import { ProfileBottomSheetComponent } from './main/profile-bottom-sheet/profile-bottom-sheet.component';
import { LevelComponent } from './main/profile-bottom-sheet/level/level.component';
import {MatRadioModule} from "@angular/material/radio";
import {
  GoogleLoginProvider, GoogleSigninButtonModule,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "@abacritt/angularx-social-login";
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HeaderComponent,
    SidenavListComponent,
    SignupComponent,
    LoginSignupButtonsComponent,
    MainBottomSheetComponent,
    LoginBottomSheetComponent,
    SignupBottomsheetComponent,
    ProfileBottomSheetComponent,
    LevelComponent,
    AboutusComponent,
    ContactComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    RoutingModule,
    MatSidenavModule,
    MatListModule,
    MatLineModule,
    FlexModule,
    FlexLayoutModule,
    MatBottomSheetModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCarouselModule,
    MatDividerModule,
    HttpClientModule,
    FormsModule,
    MatRadioModule,
    SocialLoginModule,
    GoogleSigninButtonModule

  ],
  providers: [MatDatepickerModule,
  {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '724653378617-00kp4ave75skimric5bvqn3o3rr66pto.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
