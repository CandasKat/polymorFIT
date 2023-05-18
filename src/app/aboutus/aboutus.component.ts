import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  sections = ['section1', 'section2', 'section3', 'section4', 'section5'];

  constructor() { }

  ngOnInit(): void { }
}

