import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import AnimationsUtil from 'src/app/services/animations.util';

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
    private router: Router,
    private animationsUtil: AnimationsUtil,
  ) { }

  ngOnInit() {
    // init with MOCK data
    this.stops = this.mockStops;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }

  public openStopDetail(event, idStop) {
    event.stopPropagation();
    this.router.navigateByUrl('tabs/stops/stop-detail/' + idStop);
    console.log(idStop);
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

}
