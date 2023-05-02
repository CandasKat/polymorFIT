import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        'transform': 'translate3d(0, 0, 0)',
        'visibility': 'visible'
      })),
      state('out', style({
        'transform': 'translate3d(100%, 0, 0)',
        'visibility': 'hidden'
      })),
      transition('in => out', animate('400ms ease-out')),
      transition('out => in', animate('400ms ease-in'))
    ])
  ]
})
export class AppComponent {
  title = 'polymorFIT';
}
