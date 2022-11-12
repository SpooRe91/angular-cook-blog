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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllMeals().subscribe({
      next: (value) => {

        this.homePageRecipes = value.slice(value.length - 4, value.length);
        console.log(this.homePageRecipes);
      },
      error: (err) => console.log(err)
    });
  }
}
