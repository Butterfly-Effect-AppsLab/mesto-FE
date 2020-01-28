import { Component, OnInit, Input } from '@angular/core';
import { LinesService } from '../../services/api/lines.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FavouriteService } from 'src/app/services/favourites/favourite.service';
import AnimationsUtil from 'src/app/services/animations.util';

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
    private saveFavourite: FavouriteService,
    private animationsUtil: AnimationsUtil
  ) { }

  ngOnInit() {

      this.idLine = this.route.snapshot.paramMap.get('lineId');
      this.idDirection = this.route.snapshot.paramMap.get('directionId');
      // console.log(this.idLine);
      // console.log(this.idDirection);
  }

  public saveFavouriteStop(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.buttonIcon === 'heart-empty') {
      this.buttonIcon = 'heart';
      this.heartClass = 'heartFilled';
      this.animationsUtil.showMessage('Pridane do oblubenych.');
    } else if (this.buttonIcon === 'heart') {
        this.buttonIcon = 'heart-empty';
        this.heartClass = '';
        this.animationsUtil.showMessage('Oblubene odstranene');
    }
  }

  public openLineTimetable(event, idStop, idLine, idDirection) {
    // console.log(idStop, ' / ', idLine, idDirection);
    this.router.navigateByUrl(
      'tabs/lines/line-detail/' + idLine + '/' + idDirection + '/' + idStop +
      '/timetable'
    );
  }

}
