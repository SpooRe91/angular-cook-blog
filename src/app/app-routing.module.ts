// import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './recipes/list/list.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomepageComponent
  },

  {
    path: 'recipe/browse',
    pathMatch: 'full',
    redirectTo: '/recipe/browse'
  },
  {
    path: 'recipe/browse',
    component: ListComponent
  },

  {
    path: 'recipe/macros',
    pathMatch: 'full',
    redirectTo: '/recipe/macros'
  },
  {
    path: 'recipe/details/:id',
    pathMatch: 'full',
    redirectTo: '/recipe/details/:id'
  }

];
export const AppRoutingModule = RouterModule.forRoot(routes);

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
