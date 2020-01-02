import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-stops-tab',
  templateUrl: './stops-tab.page.html',
  styleUrls: ['./stops-tab.page.scss'],
})
export class StopsTabPage implements OnInit {

  buttonIcon = 'heart-empty';
  heartClass;
  stops = [];

  mockStops = [
    {
      name: 'Kollárovo námestie',
      lines: ['31', '39', '80', '94', '202', '207', '207']
    },
    {
      name: 'Americké námestie',
      lines: ['203', '80', 'N80', 'N44']
    }
  ];

  constructor(
    public toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    // init with MOCK data
    this.stops = this.mockStops;
  }

  public openStopDetail(event, idStop) {
    event.stopPropagation();
    this.router.navigateByUrl('tabs/stops/stop-detail/' + idStop);
  }

  public saveFavouriteStop(event) {
    event.stopPropagation();
    event.preventDefault();

    if (this.buttonIcon === 'heart-empty') {
      this.buttonIcon = 'heart';
      this.heartClass = 'heartFilled';
      this.showMessage('Pridane do oblubenych.');
    } else if (this.buttonIcon === 'heart') {
        this.buttonIcon = 'heart-empty';
        this.heartClass = '';
        this.showMessage('Oblubene odstranene');
    }
  }

  public showMessage(toastText) {
    this.toastController.create({
      message: toastText,
      duration: 5000,
      animated: true,
      cssClass: 'customToast',
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          icon: 'close'
        }],
      color: 'dark'
    }).then((obj) => {
      obj.present();
    });
  }

}
