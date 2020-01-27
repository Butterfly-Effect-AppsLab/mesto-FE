import { Component, OnInit, Input } from '@angular/core';
import { DeparturesService } from 'src/app/services/api/departures/departures.service';
import { InternalStorageService } from 'src/app/services/storage/internal-storage.service';
import { Storage } from '@ionic/storage';
import { FavouriteService } from 'src/app/services/favourites/favourite.service';

@Component({
  selector: 'fav-line-card',
  templateUrl: './fav-line-card.component.html',
  styleUrls: ['./fav-line-card.component.scss'],
})
export class FavLineCardComponent implements OnInit {

  @Input() favLinesData;
  pom;
  favLine;
  favArray = [];

  constructor(
    private departureS: DeparturesService,
    private storage: InternalStorageService,
    private favouriteService: FavouriteService,
  ) { }

  ngOnInit() {
    console.log(this.favLinesData);
    this.pom = this.getLineDep(this.favLinesData.id, this.favLinesData.direction, this.favLinesData.stop).subscribe(
      resp => {
        this.favLine = resp;
        console.log(this.favLine);
      }
    );

  }

  public getLineDep(line, direction, stop) {
    return this.departureS.getLineDepartures(line, direction, stop);
  }

  public removeFavouriteLine(event, id) {
    this.favouriteService.removeLineFromFavourites(this.favLinesData.id, this.favLinesData.direction, this.favLinesData.stop);
    // console.log(pp.lines);
    // this.storage2.set('test', pp);
  }
}
