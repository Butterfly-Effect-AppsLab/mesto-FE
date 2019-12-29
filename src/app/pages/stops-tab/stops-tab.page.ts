import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stops-tab',
  templateUrl: './stops-tab.page.html',
  styleUrls: ['./stops-tab.page.scss'],
})
export class StopsTabPage implements OnInit {

  stops = [];

  mockStops = [
    {
      name: 'Kollárovo námestie',
      lines: ['31', '39', '80', '94', '202', '207', '207']
    },
    {
      name: 'Kollárovo námestie',
      lines: ['203', '80', 'N80', 'N44']
    }
  ];

  constructor() {}

  ngOnInit() {
    // init with MOCK data
    this.stops = this.mockStops;
  }

}
