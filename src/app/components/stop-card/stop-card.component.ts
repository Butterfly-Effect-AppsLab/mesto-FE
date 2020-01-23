import { Component, OnInit, Input } from '@angular/core';
// import { StopsService } from '../..services/api/stops.service';
import AnimationsUtil from 'src/app/services/animations.util';

@Component({
  selector: 'stop-card',
  templateUrl: './stop-card.component.html',
  styleUrls: ['./stop-card.component.scss'],
})
export class StopCardComponent implements OnInit {
  [x: string]: any;

  @Input() stops;
  @Input() isFavourite;

  buttonIcon = 'heart-empty';
  heartClass;

  constructor(
    public animationsUtil: AnimationsUtil
  ) { }

  ngOnInit() {

    // podla toho aka je hodnota v isFavourite tak priradovat heaetFilled OR heart empty
    if (this.isFavourite) {
      this.buttonIcon = 'heart';
      this.heartClass = 'heartFilled';
    }
  }

  public saveFavouriteStop(event) {
    event.stopPropagation();
    event.preventDefault();

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

}
