import { FormsModule } from '@angular/forms';
import { AuthModule } from './../auth/auth.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { MacrosComponent } from './macros/macros.component';
import { SharedModule } from '../shared/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    MacrosComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AuthModule,
    FormsModule,
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    MacrosComponent,
  ]
})
export class CoreModule { }
