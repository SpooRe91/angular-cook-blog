import { GlobalLoaderService } from './../services/global-loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  path: string = "../../assets/logo.ico";
  alt: string = '#';

  constructor(public globalLoaderService: GlobalLoaderService) { }

  ngOnInit(): void {
  }

}
