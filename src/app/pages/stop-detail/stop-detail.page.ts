import { Component, OnInit, ViewChild } from '@angular/core';
// Ionic
import { IonSlides, ToastController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import AnimationsUtil from 'src/app/services/animations.util';
import { StopsService } from 'src/app/services/api/stops/stops.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InternalStorageService } from 'src/app/services/storage/internal-storage.service';
import { DeparturesService } from 'src/app/services/api/departures/departures.service';


@Component({
  selector: 'app-stop-detail',
  templateUrl: './stop-detail.page.html',
  styleUrls: ['./stop-detail.page.scss'],
})

export class StopDetailPage implements OnInit {

  stopId = null;
  buttonIcon;
  heartClass;
  NextWasClicked = null;
  isFavouriteStop;

  @ViewChild('slides', {static: true}) ionSlides: IonSlides;

  public showLeftButton = true;
  public showRightButton: boolean;
  slideOpt: any;
  stopData: any = [];
  departures: any = [];
  flag;
  fromMap;
  platformId;
  virt;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController,
    private animationsUtils: AnimationsUtil,
    private stopsService: StopsService,
    private storage: InternalStorageService,
    private departureService: DeparturesService,
    private platform: Platform
  ) {
    this.slideOpt = {
      initialSlide: 3,
      slidesPerView: 6
    };
  }

  ngOnInit() {

    this.stopId = this.route.snapshot.paramMap.get('stopId');
    this.fromMap = this.platform.getQueryParam('platform');

    if (this.fromMap === '1') {
      this.platformId = this.stopId;
      // this.getStopLineData(this.stopId);
      // this.getDepartures(this.stopId);
      this.getVirtualTable1Dir(this.platformId);
    } else {
      // console.log('aa');
      this.getStopLineData(this.stopId);
      this.getDepartures(this.stopId);
    }

    // console.log(this.stopId);
    // console.log(this.ionSlides);

    this.storage.getFavouriteStops().then((val) => {
      this.isFavouriteStop = val;
      console.log('isstop: ' + this.isFavouriteStop);
      if (this.isFavouriteStop === null) {
        this.buttonIcon = 'heart-empty';
        this.flag = -1;
      } else {
        this.isFavouriteStop.filter((item) => {
          return this.flag = item.indexOf(this.stopId);
        });
        if (this.flag === 0) {
          this.buttonIcon = 'heart';
          this.heartClass = 'heartFilled';
        } else {
          this.buttonIcon = 'heart-empty';
        }
      }
    });
}

  ionViewDidLoad() {
    // this.viewController.setBackButtonText('My Back Button Text');
  }

    public getStopLineData(idStop) {
      this.stopsService.getStopLines(idStop)
        .subscribe(
          result => {
            this.stopData = result;
            console.log(this.stopData);
        });
    }

    public getDepartures(idStop) {
      this.departureService.getLinesDeparturesAtStop(idStop).subscribe(
        res => {
          this.departures = res;
          console.log(this.departures);
      });
    }

    public getVirtualTable1Dir(idPlatform) {
      this.departureService.getVirtualTableOneDirection(idPlatform).subscribe(
        re => {
          this.departures = re;
          console.log(this.departures);
      });
    }

    public slideNext(): void {
        this.ionSlides.slideNext();
        this.NextWasClicked = 1;
        // console.log(this.NextWasClicked);
        if (this.NextWasClicked === 1) {
          // this.showLeftButton = true;
        }
    }

    // Method that shows the previous slide
    public slidePrev(): void {
        this.ionSlides.slidePrev();
        // console.log(this.ionSlides.isBeginning(true));
    }

    public saveFavouriteStop(event) {
      event.stopPropagation();
      event.preventDefault();

      console.log('flag:' + this.flag);

      if (this.flag === -1) {
        console.log('save');
        this.storage.saveNewFavourite(2, this.stopId);
      }
      if (this.flag === 0) {
        console.log('remve');
        this.storage.removeFromFavourite(2, this.stopId);
      }

      if (this.buttonIcon === 'heart-empty') {
        this.buttonIcon = 'heart';
        this.heartClass = 'heartFilled';
        this.animationsUtils.showMessage('Zastávka bola pridaná k Obľúbeným');
      } else if (this.buttonIcon === 'heart') {
          this.buttonIcon = 'heart-empty';
          this.heartClass = '';
          this.animationsUtils.
            showMessage('Zastávka bola odobraná z Obľúbených');
      }

    }

}
