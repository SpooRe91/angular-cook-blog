import { RouterModule } from '@angular/router';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared/shared.module';
import { RecipeDetails } from './details/details.component';
import { MacrosComponent } from '../core/macros/macros.component';
import { AuthGuard } from '../Guards/user-guard';


@NgModule({
  declarations: [
    ListComponent,
    RecipeDetails,
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'recipe/macros',
        component: MacrosComponent
      },
      {
        path: 'recipe/details/:id',
        component: RecipeDetails
      },
    ])
  ],
  exports: [
    ListComponent
  ]
})
export class RecipeModule { }
