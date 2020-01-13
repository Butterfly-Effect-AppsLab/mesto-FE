import { Component, OnInit } from '@angular/core';
import { FavStopCardComponent } from '../../components/fav-stop-card/fav-stop-card.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-favourite-tab',
  templateUrl: './favourite-tab.page.html',
  styleUrls: ['./favourite-tab.page.scss'],
})
export class FavouriteTabPage implements OnInit {


  backdrop = false;

  constructor(public alertController: AlertController) { }

  ngOnInit() {
    // this.presentAlert();
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
    console.log('saved');
  }

}
