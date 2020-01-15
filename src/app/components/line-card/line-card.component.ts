import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { LinesService } from '../../services/api/lines.service';
import { Router } from '@angular/router';

@Component({
  selector: 'line-card',
  templateUrl: './line-card.component.html',
  styleUrls: ['./line-card.component.scss'],
})
export class LineCardComponent implements OnInit {

  @Input() linesData;

  constructor(
    private router: Router,
    public linesApi: LinesService
  ) {

    // this.linesData = [];

  }

  ngOnInit() {

    console.log(this.linesData);

    // this.getLinesList();

  }

  openLineDetail(event) {
    event.stopPropagation();
    this.router.navigateByUrl('tabs/lines/line-detail/' + this.linesData.id);
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
