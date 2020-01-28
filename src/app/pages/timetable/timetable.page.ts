import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StopsService } from 'src/app/services/api/stops/stops.service';
import AnimationsUtil from 'src/app/services/animations.util';
import { InternalStorageService } from 'src/app/services/storage/internal-storage.service';
import { FavouriteService } from 'src/app/services/favourites/favourite.service';
import { LinesService } from 'src/app/services/api/lines.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.page.html',
  styleUrls: ['./timetable.page.scss'],
})
export class TimetablePage implements OnInit {

  buttonIcon;
  heartClass;
  idLine;
  idDirection;
  idStop;
  timetableData: any = [];
  hasClosestMinMatch = false;
  flag;
  isFavouriteLine;
  stopData: any = [];
  lineData: any = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private stopService: StopsService,
              private animationsUtil: AnimationsUtil,
              private favouriteService: FavouriteService,
              private storage: InternalStorageService,
              private linesService: LinesService
  ) { }

  ngOnInit() {

    this.idLine = this.route.snapshot.paramMap.get('lineId');
    this.idDirection = this.route.snapshot.paramMap.get('directionId');
    this.idStop = this.route.snapshot.paramMap.get('stopId');

    this.getStopData(this.idStop);
    this.getTimetable(this.idLine, this.idDirection, this. idStop);
    this.getLineData(this.idLine);

    this.favouriteService.getFavouriteLines$().subscribe(lines => {
      const isFavouriteLine = lines.find(line => line.id === this.idLine && line.direction === this.idDirection);
      if (typeof isFavouriteLine === 'undefined') {
        this.buttonIcon = 'heart-empty';
        this.heartClass = '';
      } else {
        this.buttonIcon = 'heart';
        this.heartClass = 'heartFilled';
      }
    });

    this.buttonIcon = 'heart-empty';
  }

  getStopData(stopId) {
    this.stopService.getStopLines(stopId)
      .subscribe(
        result => {
          this.stopData = result;
          // console.log(this.stopData);
        }
    );
  }

  public getTimetable(line, direction, stop) {
    this.stopService.getStopTimetable(line, direction, stop).
      subscribe(
          res => {
            this.timetableData = res;
            // console.log(this.timetableData);
      });
  }

  public getLineData(line) {
    this.linesService.fetchSingleLine$(line).subscribe(
      vys => {
        this.lineData = vys[0].line_name;
        // console.log('linka: ' + this.lineData);
    });
  }

  public toggleFavouriteLine(event) {
    event.stopPropagation();
    event.preventDefault();

    if (this.buttonIcon === 'heart-empty') {
      this.favouriteService.addLineToFavourites(this.idLine, this.idDirection, this.idStop);
      this.buttonIcon = 'heart';
      this.heartClass = 'heartFilled';
      this.animationsUtil.showMessage('Linka bola pridaná k Obľúbeným');
    } else {
      this.favouriteService.removeLineFromFavourites(this.idLine, this.idDirection, this.idStop);
      this.buttonIcon = 'heart-empty';
      this.heartClass = '';
      this.animationsUtil.showMessage('Linka bola odstránená z Obľúbených');
    }
  }

  isClosest(timetable, exact = true) {
    const now = new Date();

    const hour = parseInt(timetable.hour, 10);
    return hour === now.getHours() || (!exact && (hour - 1 === now.getHours()));
  }

  isClosestMinute(timetableMinute, timetableMinutes) {
    const now = new Date();
    const minutes = now.getMinutes();
    let closest;

    if (!this.hasClosestMinMatch) {
      closest = timetableMinutes[0];
    } else {
      closest = timetableMinutes.find(minute => parseInt(minute, 10) >= minutes);
    }

    const match = closest && parseInt(closest, 10) === parseInt(timetableMinute, 10);
    if (match) {
      this.hasClosestMinMatch = true;
    }
    return match;
  }

}
