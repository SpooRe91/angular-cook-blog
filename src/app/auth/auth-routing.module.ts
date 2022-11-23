import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from "@angular/router";
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  {
    path: 'auth/login',
    // pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'auth/register',
    // pathMatch: 'full',
    component: RegisterComponent
  },
  {
    path: 'auth/logout',
    // pathMatch: 'full',
    component: LogoutComponent
  },
  {
    path: 'auth/profile',
    // pathMatch: 'full',
    component: ProfileComponent
  },
]

export const AuthRoutingModule = RouterModule.forChild(routes);
