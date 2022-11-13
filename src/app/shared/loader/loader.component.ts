import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  interval: string = '';

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.interval += '.';
      if (this.interval > '...') { this.interval = '' }
    }, 700);
  }

}
