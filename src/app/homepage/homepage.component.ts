import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  path: string = "../../assets/spaghetti-with-pesto-prawns-served-plate.jpg";
  alt: string = '#';
  constructor() { }

  ngOnInit(): void {
  }

}
