import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LinesService } from '../../services/api/lines.service';

@Component({
  selector: 'app-line-detail',
  templateUrl: './line-detail.page.html',
  styleUrls: ['./line-detail.page.scss'],
})
export class LineDetailPage implements OnInit {

  idLine = null;
  buttonIcon = 'heart-empty';
  heartClass;
  lineNumber;
  idDirection;

  lineStops: any  = []; // toto je premenna ktoru vyuzivam v page.ts v ngFor

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private linesService: LinesService
  ) { }

  ngOnInit() {

    this.idLine = this.route.snapshot.paramMap.get('lineId');
    this.idDirection = this.route.snapshot.paramMap.get('directionId');
    // this.idDirection = 3;
    // console.log(this.idLine);
    // init with MOCK data
    /*
    this.lineStops = this.mockLineStops;
    console.log(this.lineStops[0].lineStops);
    */
    this.getStopsOnLine(this.idLine, this.idDirection);
  }

  public getStopsOnLine(lineNumber, idDirection) {
      this.linesService.fetchLineDirections$(lineNumber, idDirection)
        .subscribe(
          result => {
            this.lineStops = result;
            console.log(this.lineStops);
          }
      );
  }

  public openLineTimetable(event, idLine) {
    event.stopPropagation();
    this.router.navigateByUrl('tabs/lines/line-detail/' + idLine + '/timetable');
  }

}
