import { RecipeDetails } from './details/details.component';
import { RouterModule, Routes } from '@angular/router';
import { MacrosComponent } from '../core/macros/macros.component';
import { ListComponent } from './browse/list.component';

const routes: Routes = [
  {
    path: 'recipe/browse',
    pathMatch: 'full',
    component: ListComponent
  },

  {
    path: 'recipe/macros',
    pathMatch: 'full',
    component: MacrosComponent
  },

  {
    path: 'recipe/details/:id',
    pathMatch: 'full',
    component: RecipeDetails
  },
];



export const RecipesRoutingModule = RouterModule.forRoot(routes);

