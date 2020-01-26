import { Component, OnInit } from '@angular/core';
import { FavStopCardComponent } from '../../components/fav-stop-card/fav-stop-card.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { InternalStorageService } from 'src/app/services/storage/internal-storage.service';
import { DeparturesService } from 'src/app/services/api/departures/departures.service';
import { Storage } from '@ionic/storage';

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
  dpc;

  pp = [
    {
      1:
        {
        direction: 3,
        stop: 16
        }
    },
    {
      4: {
        direciton: 4,
        stop: 9
      }
    }
  ];

  // TODO premenna pre favourites z DB

  constructor(
    private router: Router,
    private storage: InternalStorageService,
    private storage2: Storage
  ) { }

  ngOnInit() {

    // importnut service storageService
    // zavolat getLines, getStops zo storage service
    this.storage.getFavouriteLines().then((valLines) => {
      this.lines = valLines;
      // console.log('Fav Lines: ' + this.lines);
      if (this.stops !== null) {
        this.noFavsData = false;
      }
      this.favLinesData = this.lines;
    });

    this.storage.getFavouriteStops().then((valStops) => {
      this.stops = valStops;
      console.log('Fav stops: ' + this.stops);
      if (this.stops !== null) {
        this.noFavsData = false;
      }
      this.favStopsData = this.stops;
    });

    this.pp.map(val =>
      console.log(val)
      );
    // this.storage2.set('test', this.pp);
    this.dpc = this.getFckLinesDB();
    console.log('dpc:' + this.dpc);
    this.storage.showDataAlert();

    // this.favourite = this.storage.get('line').then((val) =>
    // this.saveNewFavouite(1, 4);
    /*
    this.getFavourites().then((va) =>
      console.log(va)
    );
    */
  }

  public async getFckLinesDB() {
    const lineVal = await this.storage2.get('test');
    console.log(lineVal);
    return lineVal;
  }

  public showAll() {
    this.showLinesFlag = true;
    this.showStopsFlag = true;
   }
  public showLines() {
    this.showLinesFlag = true;
    this.showStopsFlag = false;
  }
  public showStops() {
    this.showLinesFlag = false;
    this.showStopsFlag = true;
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
