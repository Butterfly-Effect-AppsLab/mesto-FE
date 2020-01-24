import { Component, OnInit } from '@angular/core';
import { FavStopCardComponent } from '../../components/fav-stop-card/fav-stop-card.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { InternalStorageService } from 'src/app/services/storage/internal-storage.service';

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

  // TODO premenna pre favourites z DB

  constructor(
    private router: Router,
    private storage: InternalStorageService
  ) { }

  ngOnInit() {

    // importnut service storageService
    // zavolat getLines, getStops zo storage service
    /*
    this.servicesStorage.getLines().then((val) =>
      this.lines = val
    );
    */
    this.storage.getFavouriteLines();
    this.storage.getFavouriteStops();

    this.storage.showDataAlert();
    // this.storage.set('line', 1);

    // this.favourite = this.storage.get('line').then((val) =>
    // this.saveNewFavouite(1, 4);
    /*
    this.getFavourites().then((va) =>
      console.log(va)
    );
    */
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
