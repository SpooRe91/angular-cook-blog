import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalLoaderService {

  title: string | null = null;
  isLoading: boolean | undefined = false;

  showLoader(title: string, status?: boolean): void {
    this.title = title;
    this.isLoading = status;
  }

  hideLoader(status?: boolean) {
    this.title = null;
    this.isLoading = status;
  }
}
