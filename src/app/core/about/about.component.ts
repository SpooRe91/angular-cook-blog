import { Component } from '@angular/core';
import { CoreService } from './../core-service.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  constructor(public coreService: CoreService) { }
}
