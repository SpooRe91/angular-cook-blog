import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { MacrosComponent } from './macros/macros.component';

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    MacrosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    MacrosComponent
  ]
})
export class CoreModule { }
