import { Component, OnInit } from '@angular/core';
import { FavStopCardComponent } from '../../components/fav-stop-card/fav-stop-card.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { InternalStorageService } from 'src/app/services/storage/internal-storage.service';
import { DeparturesService } from 'src/app/services/api/departures/departures.service';
import { Storage } from '@ionic/storage';
import { FavouriteService } from 'src/app/services/favourites/favourite.service';

@Component({
  selector: 'app-favourite-tab',
  templateUrl: './favourite-tab.page.html',
  styleUrls: ['./favourite-tab.page.scss'],
})
export class FavouriteTabPage implements OnInit {

  backdrop = false;
  favourite: Promise<any>;
  savedLines = [];
  favLines: any;
  noFavsData = true;
  showStopsFlag = true;
  showLinesFlag = true;
  stops = [];  // toto je z DB fav stops
  lines = [];  // toto je z DB fav lines
  favStopsData;
  favLinesData;
  favArray;
  activeAll = true;
  activeLines = false;
  activeStops = false;
  notActive = 'active';

  constructor(
    private router: Router,
    private storage: InternalStorageService,
    private favouriteService: FavouriteService
  ) { }

  ngOnInit() {

    this.favouriteService.getFavouriteLines$().subscribe(lines => {
      this.lines = lines;
    });
    this.favouriteService.getFavouriteStops$().subscribe(stops => {
      this.stops = stops;
    });

    this.storage.showDataAlert();
  }

  public showAll() {
    this.showLinesFlag = true;
    this.showStopsFlag = true;
    this.activeAll = true;
    this.activeLines = false;
    this.activeStops = false;
   }
  public showLines() {
    this.showLinesFlag = true;
    this.showStopsFlag = false;
    this.activeLines = true;
    this.activeAll = false;
    this.activeStops = false;
  }
  public showStops() {
    this.showLinesFlag = false;
    this.showStopsFlag = true;
    this.activeStops = true;
    this.activeAll = false;
    this.activeLines = false;
  }

  public navTo(type) {
    if (type === 1) {
      this.router.navigateByUrl('/tabs/lines');
    }
    if (type === 2) {
      this.router.navigateByUrl('/tabs/stops');
    }
  }
}
