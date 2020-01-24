import { Component, OnInit, ViewChild } from '@angular/core';
// Ionic
import { IonSlides, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import AnimationsUtil from 'src/app/services/animations.util';
import { StopsService } from 'src/app/services/api/stops/stops.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InternalStorageService } from 'src/app/services/storage/internal-storage.service';


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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController,
    private animationsUtils: AnimationsUtil,
    private stopsService: StopsService,
    private storage: InternalStorageService
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

    this.storage.getFavouriteStop(this.stopId).then((val) => {
      this.isFavouriteStop = val;
      if (this.isFavouriteStop !== null) {
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

  private initializeCategories(): void {

        // Select it by defaut
        // this.selectedCategory = this.categories[0];

        // Check which arrows should be shown
        // this.showLeftButton = false;
        // this.showRightButton = this.categories.length > 3;
  }

    // Method executed when the slides are changed
    public slideChanged(): void {

        // const currentIndex = this.ionSlides.getActiveIndex();
        // this.showLeftButton = currentIndex !== 0;
        // this.showRightButton = currentIndex !== Math.ceil(this.ionSlides.length() / 3);
    }

    // Method that shows the next slide
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

      /*
      if (this.buttonIcon === 'heart-empty') {
        this.buttonIcon = 'heart';
        this.heartClass = 'heartFilled';
        this.animationsUtils.showMessage('Linka bola pridaná k Obľúbeným');
      } else if (this.buttonIcon === 'heart') {
          this.buttonIcon = 'heart-empty';
          this.heartClass = '';
          this.animationsUtils.
            showMessage('linka 39 Televízia bola odobraná z Obľúbených');
      }
      */
    }

}
