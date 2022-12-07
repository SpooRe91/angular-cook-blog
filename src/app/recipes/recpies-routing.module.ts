import { UserGuard } from './../Guards/user-guard';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './browse/list.component';
import { RecipeDetails } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { MacrosComponent } from '../core/macros/macros.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { RouterModule, Routes } from '@angular/router';

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

  {
    path: 'recipe/create',
    pathMatch: 'full',
    canActivate: [UserGuard],
    component: CreateComponent
  },

  {
    path: 'recipe/my-recipes',
    pathMatch: 'full',
    canActivate: [UserGuard],
    component: MyRecipesComponent
  },

  {
    path: 'recipe/edit/:id',
    pathMatch: 'full',
    canActivate: [UserGuard],
    component: EditComponent
  },

];

export const RecipesRoutingModule = RouterModule.forChild(routes);

