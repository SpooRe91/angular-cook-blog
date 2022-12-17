import { NgModule } from '@angular/core';
import { AuthModule } from './../auth/auth.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { MacrosComponent } from './macros/macros.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AboutComponent,
    MacrosComponent,
    FooterComponent,
    NavigationComponent,
    PageNotFoundComponent,
  ],
  imports: [
    AuthModule,
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    MacrosComponent,
    AboutComponent
  ]
})
export class CoreModule { }
