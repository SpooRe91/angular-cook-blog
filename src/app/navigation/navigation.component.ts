import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  path: string = "../../assets/logo.ico";
  alt: string = '#';
  constructor() { }

  ngOnInit(): void {
  }

}
