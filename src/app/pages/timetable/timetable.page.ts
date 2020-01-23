import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StopsService } from 'src/app/services/api/stops/stops.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.page.html',
  styleUrls: ['./timetable.page.scss'],
})
export class TimetablePage implements OnInit {

  buttonIcon = 'heart-empty';
  heartClass;
  idLine;
  idDirection;
  idStop;
  timetableData: any = [];
  hasClosestMinMatch = false;

  stopData: any = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private stopService: StopsService
  ) { }

  ngOnInit() {

    this.idLine = this.route.snapshot.paramMap.get('lineId');
    this.idDirection = this.route.snapshot.paramMap.get('directionId');
    this.idStop = this.route.snapshot.paramMap.get('stopId');

    console.log(this.idLine, '/', this.idDirection, '/', this.idStop);
    this.getStopData(this.idStop);
    this.getTimetable(this.idLine, this.idDirection, this. idStop);
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
            console.log(this.timetableData);
      });
  }

  scrollToClosest() {

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
