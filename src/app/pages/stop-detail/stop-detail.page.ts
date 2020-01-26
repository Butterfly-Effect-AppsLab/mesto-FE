import { Component, OnInit, ViewChild } from '@angular/core';
// Ionic
import { IonSlides, ToastController } from '@ionic/angular';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController,
    private animationsUtils: AnimationsUtil,
    private stopsService: StopsService,
    private storage: InternalStorageService,
    private departureService: DeparturesService
  ) {
    this.slideOpt = {
      initialSlide: 3,
      slidesPerView: 5
    };
  }

  ngOnInit() {

    this.stopId = this.route.snapshot.paramMap.get('stopId');
    console.log(this.stopId);
    console.log(this.ionSlides);

    this.getStopLineData(this.stopId);
    this.getDepartures(this.stopId);

    this.storage.getFavouriteStops(this.stopId).then((val) => {
      this.isFavouriteStop = val;
      this.isFavouriteStop.filter((item) => {
        return this.flag = item.indexOf(this.stopId);
      });
      if (this.flag === 0) {
        this.buttonIcon = 'heart';
        this.heartClass = 'heartFilled';
      } else {
        this.buttonIcon = 'heart-empty';
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

      console.log(this.stopId);

      this.storage.saveNewFavourite(2, this.stopId);

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
