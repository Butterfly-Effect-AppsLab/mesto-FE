import { Component, OnInit, Input } from '@angular/core';
import AnimationsUtil from 'src/app/services/animations.util';

@Component({
  selector: 'virtual-table-card',
  templateUrl: './virtual-table-card.component.html',
  styleUrls: ['./virtual-table-card.component.scss'],
})
export class VirtualTableCardComponent implements OnInit {

  @Input() stops;
  @Input() departure;

  constructor(
    public animationsUtil: AnimationsUtil
  ) { }

  ngOnInit() {}



}
