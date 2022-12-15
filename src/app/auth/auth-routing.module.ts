import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from "@angular/router";
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent
  },
  {
    path: 'logout',
    pathMatch: 'full',
    component: LogoutComponent
  },
  {
    path: 'profile/:id',
    pathMatch: 'full',
    component: ProfileComponent
  },
]

export const AuthRoutingModule = RouterModule.forChild(routes);
