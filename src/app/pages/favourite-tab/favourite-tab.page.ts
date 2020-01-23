import { Component, OnInit } from '@angular/core';
import { FavStopCardComponent } from '../../components/fav-stop-card/fav-stop-card.component';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

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
    public alertController: AlertController,
    private storage: Storage,
    private router: Router
  ) { }

  ngOnInit() {

    // importnut service storageService
    // zavolat getLines, getStops zo storage service
    /*
    this.servicesStorage.getLines().then((val) =>
      this.lines = val
    );
    */

    this.storage.get('dataAlert').then((val) => {
      if (val !== 1) {
        this.presentAlert();
      }
    });
    // this.storage.set('line', 1);

    // this.favourite = this.storage.get('line').then((val) =>
    // this.saveNewFavouite(1, 4);
    this.getFavourites().then((va) =>
      console.log(va)
    );

    this.storage.get('hala').then((ll) =>
      console.log('exists: ' + ll)
    );
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
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Upozornenie',
      message: 'Aplikácia obsahuje limitovanú sadu testovacích dát.',
      buttons: [
         {
          text: 'OK',
          handler: () => {
            this.saveMsgAboutMockData();
          }
        }
      ]
    });

    await alert.present();
  }

  saveMsgAboutMockData() {
    this.storage.set('dataAlert', 1);
    console.log('saved');
  }

  public saveNewFavouite(type, favouriteValue) {

    /*
    *   type = 1 - line || 2 - stop
    *   value = lineId || stopId
    */

    if (type === 1) {
      this.storage.get('line').then((val) => {
        this.savedLines.push(val),
        this.savedLines.push(favouriteValue),
        console.log(this.savedLines);
        this.storage.set('line', this.savedLines);
      });

      // this.storage.set('line', favouriteValue);
    }
    if (type === 2) {
      this.storage.set('stop', favouriteValue);
    }
  }

  public async getFavourites() {
    const vals = await this.storage.get('line');
    return this.favLines = vals;
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
