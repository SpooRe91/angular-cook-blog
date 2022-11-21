import { ListComponent } from './browse/list.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RecipeDetails } from './details/details.component';

@NgModule({
  declarations: [
    ListComponent,
    RecipeDetails,
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
export class RecipeModule { }
