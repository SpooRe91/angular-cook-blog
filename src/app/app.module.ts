import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';

import { AuthRoutingModule } from './auth/auth-routing.module';
import { RecipesRoutingModule } from './recipes/recpies-routing.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RecipesModule } from './recipes/recipe.module';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
  ],
  imports: [
    RecipesRoutingModule,
    AuthRoutingModule,
    BrowserModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    RecipesModule,
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
  ],
  exports: [
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
