import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InternalStorageService {

  savedLines = [];
  savedStops = [];
  favLines;
  favStops;      // list of stops
  favStop;      // single stop

  constructor(private storage: Storage,
              private alertController: AlertController) { }

  public async getFavouriteStops() {
    const stop = await this.storage.get('stops');
    return this.favStop = stop;
  }

  public async getFavouriteLines() {
    // const lineVal = await this.storage.get('lines');
    const lineVal = await this.storage.get('test');
    console.log(lineVal);
    return this.favLines = lineVal.lines;
  }

  public saveNewFavourite(type, favouriteValue) {

    /*
    *   type = 1 - line || 2 - stop
    *   value = lineId || stopId
    */

    // this.storage.remove('stops');
    if (type === 1) {
      this.storage.get('lines').then((val) => {
        this.savedLines.push(favouriteValue),
        console.log(this.savedLines);
        this.storage.set('lines', this.savedLines);
      });

      // this.storage.set('line', favouriteValue);
    }
    if (type === 2) {
      this.storage.get('stops').then((val) => {
        this.savedStops = val;
        // console.log(this.savedStops);
        if (this.savedStops === null) {
          this.savedStops = [favouriteValue];
          this.storage.set('stops', this.savedStops);
        } else {
          this.storage.get('stops').then((val2) => {
            // console.log('val2: ' + val2);
            this.savedStops = val2;
            this.savedStops.push(favouriteValue);
            this.storage.set('stops', this.savedStops);
        });
          // this.savedStops.push(favouriteValue);
          // this.storage.set('stops', this.savedStops);
        }
      });
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Upozornenie',
      message:
      'Aplikácia obsahuje limitovanú sadu testovacích dát a limitovanú funkcionalitu.',
      buttons: [
         {
          text: 'Rozumiem',
          handler: () => {
            this.saveMsgAboutMockData();
          }
        }
      ]
    });

    await alert.present();
  }


  public showDataAlert() {
    this.storage.get('dataAlert').then((val) => {
      if (val !== 1) {
        this.presentAlert();
      }
    });
  }

  public saveMsgAboutMockData() {
    this.storage.set('dataAlert', 1);
  }

}
