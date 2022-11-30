import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { EditComponent } from './edit/edit.component';
import { RecipeDetails } from './details/details.component';
import { RouterModule, Routes } from '@angular/router';
import { MacrosComponent } from '../core/macros/macros.component';
import { ListComponent } from './browse/list.component';
import { CreateComponent } from './create/create.component';

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
    component: CreateComponent
  },

  {
    path: 'recipe/my-recipes',
    pathMatch: 'full',
    component: MyRecipesComponent
  },

  {
    path: 'recipe/edit/:id',
    pathMatch: 'full',
    component: EditComponent
  },

];

export const RecipesRoutingModule = RouterModule.forChild(routes);

