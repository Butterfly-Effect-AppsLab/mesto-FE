import { Component, OnInit } from '@angular/core';
import { LinesService } from '../../services/api/lines.service';

@Component({
  selector: 'line-card',
  templateUrl: './line-card.component.html',
  styleUrls: ['./line-card.component.scss'],
})
export class LineCardComponent implements OnInit {


  linesData: any;

  constructor(public linesApi: LinesService) {

    this.linesData = [];

  }

  ngOnInit() {

    this.getLinesList();

  }

  getLinesList() {
    this.linesApi.fetchLines().subscribe(response => {
      console.log(response);
    });
  }

}
