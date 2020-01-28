import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LinesService } from '../../services/api/lines.service';
import { Platform } from '@ionic/angular';

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
  secondDirection;
  dir;
  typeDirection;
  dirType;

  lineStops: any  = []; // toto je premenna ktoru vyuzivam v page.ts v ngFor

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private linesService: LinesService,
    private platform: Platform
  ) { }

  ngOnInit() {

    this.idLine = this.route.snapshot.paramMap.get('lineId');
    this.idDirection = this.route.snapshot.paramMap.get('directionId');
    this.typeDirection = this.platform.getQueryParam('direction');
    this.getStopsOnLine(this.idLine, this.idDirection);

  }

  public getStopsOnLine(lineNumber, idDirection) {
      this.linesService.fetchLineDirections$(lineNumber, idDirection)
        .subscribe(
          result => {
            this.lineStops = result;
            // console.log(this.lineStops.stops);
          }
      );
  }


  public changeLineDirection(direction) {
    event.stopPropagation();
    this.dir = this.getSingleLineData(this.idLine).subscribe(
      res => {

        if (this.typeDirection === '2') {
          this.secondDirection = res[1].id_direction;

          this.router.navigateByUrl(
            'tabs/lines/line-detail/' + this.idLine + '/'
            + this.secondDirection + '?direction=1'
          );
        }
        if (this.typeDirection === '1') {
          this.secondDirection = res[2].id_direction;

          this.router.navigateByUrl(
            'tabs/lines/line-detail/' + this.idLine + '/'
            + this.secondDirection + '?direction=2'
          );
        }
    });
  }

  public getSingleLineData(line) {
    return this.linesService.fetchSingleLine$(line);
  }

}
