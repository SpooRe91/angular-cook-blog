import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { MinLengthDirective } from './min-length.directive';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';

@NgModule({
  declarations: [
    LoaderComponent,
    MinLengthDirective,
    GlobalLoaderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    MinLengthDirective,
    GlobalLoaderComponent
  ]
})
export class SharedModule { }
