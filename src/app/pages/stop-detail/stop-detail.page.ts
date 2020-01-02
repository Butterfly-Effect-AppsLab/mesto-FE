import { Component, OnInit, ViewChild, ViewController } from '@angular/core';
// Ionic
import { IonSlides, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-stop-detail',
  templateUrl: './stop-detail.page.html',
  styleUrls: ['./stop-detail.page.scss'],
})

export class StopDetailPage implements OnInit {

  myId = null;
  buttonIcon = 'heart-empty';
  heartClass;

  @ViewChild('slides', {static: true}) ionSlides: IonSlides;

  public showLeftButton: boolean;
  public showRightButton: boolean;
  slideOpt: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController
  ) {
    this.slideOpt = {
      initialSlide: 1,
      slidesPerView: 1
    };
  }

  ngOnInit() {

    this.myId = this.route.snapshot.paramMap.get('stopId');
    console.log(this.myId);
    console.log(this.ionSlides);

    this.buttonIcon = 'heart-empty';
  }

  ionViewDidLoad() {
    this.viewController.setBackButtonText('My Back Button Text');
  }

  private initializeCategories(): void {

        // Select it by defaut
        // this.selectedCategory = this.categories[0];

        // Check which arrows should be shown
        this.showLeftButton = false;
        this.showRightButton = this.categories.length > 3;
  }

  // Method executed when the slides are changed
    public slideChanged(): void {
        const currentIndex = this.slides.getActiveIndex();
        this.showLeftButton = currentIndex !== 0;
        this.showRightButton = currentIndex !== Math.ceil(this.slides.length() / 3);
    }

    // Method that shows the next slide
    public slideNext(): void {
        this.slides.slideNext();
    }

    // Method that shows the previous slide
    public slidePrev(): void {
        this.slides.slidePrev();
    }

    public saveFavouriteStop(event) {
      event.stopPropagation();
      event.preventDefault();

      if (this.buttonIcon === 'heart-empty') {
        this.buttonIcon = 'heart';
        this.heartClass = 'heartFilled';
        this.showMessage('Pridané do obľúbených.');
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