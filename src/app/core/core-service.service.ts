import { Injectable } from '@angular/core';
import { IMacros } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  sortBy(arr: IMacros[], type: string): IMacros[] {
    if (arr !== null) {
      return this.sortedMacros(arr, type);
    }
    return arr;
  }

  sortedMacros(arr: IMacros[], type?: any): IMacros[] {
    if (arr != null) {
      if (type === 'water') {
        return arr.sort((a, b) => +a.water - +b.water);
      } else if (type === 'protein') {
        return arr.sort((a, b) => +a.protein - +b.protein);
      } else if (type === 'fat') {
        return arr.sort((a, b) => +a.fat - +b.fat);
      } else if (type === 'carb') {
        return arr.sort((a, b) => +a.carb - +b.carb);
      } else if (type === 'calories') {
        return arr.sort((a, b) => +a.calories - +b.calories);
      } else if (type === 'name') {
        return arr.sort((a, b) => a.name.toString()
          .localeCompare(b.name.toString()));
      }
    }
    return arr;
  }
  constructor() { }
}
