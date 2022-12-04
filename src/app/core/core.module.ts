import { AuthModule } from './../auth/auth.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { MacrosComponent } from './macros/macros.component';
import { SharedModule } from '../shared/shared.module';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    MacrosComponent,
    GlobalLoaderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AuthModule
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    MacrosComponent,
    GlobalLoaderComponent
  ]
})
export class CoreModule { }
