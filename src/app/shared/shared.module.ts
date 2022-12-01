import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { MinLengthDirective } from './min-length.directive';

@NgModule({
  declarations: [
    LoaderComponent,
    MinLengthDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    MinLengthDirective,
  ]
})
export class SharedModule { }
