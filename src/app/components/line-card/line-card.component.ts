import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { LinesService } from '../../services/api/lines.service';

@Component({
  selector: 'line-card',
  templateUrl: './line-card.component.html',
  styleUrls: ['./line-card.component.scss'],
})
export class LineCardComponent implements OnInit {

  @Input() linesData;

  constructor(public linesApi: LinesService) {

    // this.linesData = [];

  }

  ngOnInit() {

    console.log(this.linesData);

    // this.getLinesList();

  }

  /*
  getLinesList() {
    this.linesApi.fetchLines().subscribe(response => {
      // console.log(response.lines);
      this.linesData = response.lines;
      console.log(this.linesData);
    });
  }
  */

}
