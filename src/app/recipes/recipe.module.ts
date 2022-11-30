
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from './../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { ListComponent } from './browse/list.component';
import { RecipeDetails } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';

@NgModule({
  declarations: [
    ListComponent,
    RecipeDetails,
    EditComponent,
    MyRecipesComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    ListComponent
  ]
})
export class RecipesModule { }
