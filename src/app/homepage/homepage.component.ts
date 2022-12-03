import { AuthService } from './../auth/auth.service';
import { GlobalLoaderService } from './../core/services/global-loader.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IRecipe } from '../interfaces/recipeInterface';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  path: string = "../../assets/spaghetti-with-pesto-prawns-served-plate.jpg";
  alt: string = '#';

  homePageRecipes: IRecipe[] | null = null;

  constructor(
    private apiService: ApiService,
    public globalLoaderService: GlobalLoaderService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.globalLoaderService.showLoader("Loading");
    this.apiService.getAllMeals().subscribe({

      next: (value) => {
        if (value !== null && value !== undefined) {
          this.homePageRecipes = value.slice(value.length - 4, value.length);
          this.globalLoaderService.hideLoader();
          console.log(this.homePageRecipes);
        }
      },
      error: (err) => console.log(err)
    });
  };
};
