import { Component, OnInit, Input } from '@angular/core';
import { LinesService } from '../../services/api/lines.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'line-stop',
  templateUrl: './line-stop.component.html',
  styleUrls: ['./line-stop.component.scss'],
})
export class LineStopComponent implements OnInit {


  @Input() lineStops;
  @Input() lineData;

  buttonIcon = 'heart-empty';
  heartClass;
  idLine;
  idDirection;

  constructor(
    private lineApi: LinesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

      this.idLine = this.route.snapshot.paramMap.get('lineId');
      this.idDirection = this.route.snapshot.paramMap.get('directionId');
      // console.log(this.idLine);
      // console.log(this.idDirection);
  }

  public openLineTimetable(event, idStop, idLine, idDirection) {
    event.stopPropagation();
    console.log(idStop, ' / ', idLine, idDirection);
    this.router.navigateByUrl(
      'tabs/lines/line-detail/' + idLine + '/' + idDirection + '/' + idStop +
      '/timetable'
    );
  }


}
