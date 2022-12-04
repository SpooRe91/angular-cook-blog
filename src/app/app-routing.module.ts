// import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: HomepageComponent
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
