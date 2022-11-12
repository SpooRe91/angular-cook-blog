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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getMacros().subscribe({
      next: (value) => {
        console.log(value);
        this.macroNutrients = value.sort((a: IMacros, b: IMacros) => a.calories > b.calories ? 1 : -1);
      },
      error: (err) => console.log(err)
    });
  }

}
