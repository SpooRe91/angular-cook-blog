import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ProfileComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ProfileComponent
  ]
})
export class AuthModule { }
