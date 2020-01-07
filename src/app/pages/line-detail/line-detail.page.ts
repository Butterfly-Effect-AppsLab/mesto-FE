import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-line-detail',
  templateUrl: './line-detail.page.html',
  styleUrls: ['./line-detail.page.scss'],
})
export class LineDetailPage implements OnInit {

  idLine = null;
  buttonIcon = 'heart-empty';
  heartClass;

  lineStops = []; // toto je premenna ktoru vyuzivam v page.ts v ngFor

  mockLineStops = [
        {
          name: 'Cintorín Slávičie údolie',
          minutesFromStart: 0,
          requestStop: false,
          dist: '100'
        },
        {
          name: 'Televízia',
          minutesFromStart: 2,
          requestStop: true,
          dist: '100'
        },
        {
          name: 'ZOO',
          minutesFromStart: 4,
          requestStop: false,
          dist: '100'
        },
        {
          name: 'Lafranconi',
          minutesFromStart: 5,
          requestStop: false,
          dist: '100'
        },
        {
          name: 'Kráľovské údolie',
          minutesFromStart: 7,
          requestStop: false,
          dist: '100'
        },
        {
          name: 'Chátam Sófer',
          minutesFromStart: 9,
          requestStop: false,
          dist: '100'
        },
        {
          name: 'Zochova',
          minutesFromStart: 12,
          requestStop: false,
          dist: '100'
        }
];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.idLine = this.route.snapshot.paramMap.get('lineId');
    // init with MOCK data
    this.lineStops = this.mockLineStops;
    console.log(this.lineStops[0].lineStops);
  }

  public openLineTimetable(event, idLine) {
    event.stopPropagation();
    this.router.navigateByUrl('tabs/lines/line-detail/' + idLine + '/timetable');
  }

}
