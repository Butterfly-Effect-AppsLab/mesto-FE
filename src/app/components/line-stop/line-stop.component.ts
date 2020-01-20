import { Component, OnInit, Input } from '@angular/core';
import { LinesService } from '../../services/api/lines.service';

@Component({
  selector: 'line-stop',
  templateUrl: './line-stop.component.html',
  styleUrls: ['./line-stop.component.scss'],
})
export class LineStopComponent implements OnInit {


  @Input() lineStops;

  buttonIcon = 'heart-empty';
  heartClass;

  constructor(
    private lineApi: LinesService
  ) { }

  ngOnInit() {

      console.log('from component: ' + this.lineStops);

  }

}
