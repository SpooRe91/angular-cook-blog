import { GlobalLoaderService } from './../services/global-loader.service';
import { Component, OnInit } from '@angular/core';
import { IMacros } from 'src/app/interfaces/macrosInterface';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-macros',
  templateUrl: './macros.component.html',
  styleUrls: ['./macros.component.scss']
})
export class MacrosComponent implements OnInit {

  macroNutrients: IMacros[] | null = null;

  constructor(
    private apiService: ApiService,
    public globalLoaderService: GlobalLoaderService
  ) { }

  ngOnInit(): void {
    this.globalLoaderService.showLoader("Loading");
    this.apiService.getMacros().subscribe({

      next: (value) => {
        if (value !== null) {
          this.macroNutrients = value.sort((a: IMacros, b: IMacros) => a.calories > b.calories ? 1 : -1);
          this.globalLoaderService.hideLoader();
          console.log(this.macroNutrients);
          return;
        }
        this.macroNutrients = null;
      },
      error: (err) => console.log(err)
    });
  };
};
