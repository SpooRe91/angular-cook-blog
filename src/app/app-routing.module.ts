import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './Guards/auth-guard';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomepageComponent
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'recipe',
    loadChildren: () => import('./recipes/recipe.module').then(m => m.RecipesModule)
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];
export const AppRoutingModule = RouterModule.forRoot(routes);
