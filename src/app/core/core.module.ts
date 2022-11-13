import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { MacrosComponent } from './macros/macros.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    MacrosComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    MacrosComponent
  ]
})
export class CoreModule { }
