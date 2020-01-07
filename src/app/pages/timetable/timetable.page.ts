import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.page.html',
  styleUrls: ['./timetable.page.scss'],
})
export class TimetablePage implements OnInit {

  buttonIcon = 'heart-empty';
  heartClass;

  constructor(private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit() {
  }

}
