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
  // @Input() singleLine;

  private singleLine;
  public pom;

  constructor(
    private router: Router,
    public linesApi: LinesService
  ) {

    // this.linesData = [];

  }

  ngOnInit() {

    console.log(this.linesData);
    // console.log(this.singleLine);

    // this.getLinesList();

  }

  openLineDetail(event) {
    event.stopPropagation();

    this.pom = this.getSingleLineData(this.linesData.id).subscribe(
      resp => {
        this.singleLine = resp[1].id_direction;
        console.log(resp);
        console.log('dir: ' + this.singleLine);
        console.log('lineID: ' + this.linesData.id);
        console.log('tabs/lines/line-detail/' + this.linesData.id + '/'
          + this.singleLine);

        this.router.navigateByUrl(
          'tabs/lines/line-detail/' + this.linesData.id + '/'
          + this.singleLine
        );

      }
    );
  }

  public getSingleLineData(lineNumber) {
    return this.linesApi.fetchSingleLine$(lineNumber);
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
