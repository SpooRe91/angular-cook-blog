import { NgForm } from '@angular/forms';

import { RecipeService } from './../recipe.service';
import { AuthService } from './../../auth/auth.service';
import {
  Component,
  OnDestroy
} from '@angular/core';
import { GlobalLoaderService } from 'src/app/shared/services/global-loader.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnDestroy {

  constructor(
    public authService: AuthService,
    private recipeService: RecipeService,
    public globalLoaderService: GlobalLoaderService
  ) { }

  handleOnSubmitForm(form: NgForm) {
    if (form.invalid) { return; };
    this.globalLoaderService.showLoader("Loading", true);
    this.authService.hasError = null;

    const value: {
      name: string,
      image: string,
      portions: number,
      difficulty: string,
      ingredients: string,
      fullRecipe: string
    } = form.value;

    console.log(value);
    this.recipeService.createRecipe(value);
  }

  ngOnDestroy(): void {
    if (this.authService.hasError && this.authService.isRedirected) {
      this.authService.hasError = null;
      this.authService.isRedirected = false;
      this.globalLoaderService.hideLoader(false);
    }
    return;
  }

}
