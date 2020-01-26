import { Component, OnInit, Input } from '@angular/core';
import { DeparturesService } from 'src/app/services/api/departures/departures.service';
import { InternalStorageService } from 'src/app/services/storage/internal-storage.service';

@Component({
  selector: 'fav-stop-card',
  templateUrl: './fav-stop-card.component.html',
  styleUrls: ['./fav-stop-card.component.scss'],
})
export class FavStopCardComponent implements OnInit {

  @Input() favStopsData;
  favStop;

  constructor(
    private departureService: DeparturesService,
    private storageService: InternalStorageService
  ) { }

  ngOnInit() {
    this.departureService.getLinesDeparturesAtStop(this.favStopsData).
      subscribe(
        res => {
          this.favStop = res;
          // console.log(res);
      });
    console.log(this.favStopsData);
  }

  ionViewDidEnter() {

    this.removeFavouriteStop(event, 1, this.favStopsData);
  }

  public removeFavouriteStop(event, type, idStop) {
    this.storageService.removeFromFavourite(type, idStop);
  }
}
