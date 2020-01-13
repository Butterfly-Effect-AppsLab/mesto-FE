import { Component, OnInit, ViewChild } from '@angular/core';
// Ionic
import { IonSlides, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import AnimationsUtil from 'src/app/services/animations.util';


@Component({
  selector: 'app-stop-detail',
  templateUrl: './stop-detail.page.html',
  styleUrls: ['./stop-detail.page.scss'],
})

export class StopDetailPage implements OnInit {

  myId = null;
  buttonIcon = 'heart-empty';
  heartClass;
  NextWasClicked = null;

  @ViewChild('slides', {static: true}) ionSlides: IonSlides;

  public showLeftButton = true;
  public showRightButton: boolean;
  slideOpt: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController,
    private animationsUtils: AnimationsUtil
  ) {
    this.slideOpt = {
      initialSlide: 1,
      slidesPerView: 5
    };
  }

  ngOnInit() {

    this.myId = this.route.snapshot.paramMap.get('stopId');
    console.log(this.myId);
    console.log(this.ionSlides);

    this.buttonIcon = 'heart-empty';
  }

  ionViewDidLoad() {
    // this.viewController.setBackButtonText('My Back Button Text');
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

      if (this.buttonIcon === 'heart-empty') {
        this.buttonIcon = 'heart';
        this.heartClass = 'heartFilled';
        this.animationsUtils.showMessage('Pridané do obľúbených.');
      } else if (this.buttonIcon === 'heart') {
          this.buttonIcon = 'heart-empty';
          this.heartClass = '';
          this.animationsUtils.showMessage('Oblubene odstranene');
      }
    }

}
