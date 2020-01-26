import { Component, OnInit, Input } from '@angular/core';
// import { StopsService } from '../..services/api/stops.service';
import AnimationsUtil from 'src/app/services/animations.util';
import { StopsService } from 'src/app/services/api/stops/stops.service';
import { FavouriteService } from 'src/app/services/favourites/favourite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'stop-card',
  templateUrl: './stop-card.component.html',
  styleUrls: ['./stop-card.component.scss'],
})
export class StopCardComponent implements OnInit {
  [x: string]: any;

  @Input() stops;
  @Input() isFavourite;
  lines;

  buttonIcon = 'heart-empty';
  heartClass;

  constructor(
    public animationsUtil: AnimationsUtil,
    private stopsService: StopsService,
    private saveFavourite: FavouriteService,
    private router: Router
  ) { }

  ngOnInit() {

    // podla toho aka je hodnota v isFavourite tak priradovat heaetFilled OR heart empty
    if (this.isFavourite) {
      this.buttonIcon = 'heart';
      this.heartClass = 'heartFilled';
    }
    this.stopsService.getStopLines(this.stops.stop_id).subscribe(
      lines => {
        this.lines = lines.lines;
      });
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

  public openVirtualTable(event, idStop) {
    console.log('aaa');
    this.router.navigateByUrl(
      'tabs/stops/stop-detail/' + idStop
    );
  }
}
