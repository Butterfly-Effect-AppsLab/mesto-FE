import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { IonSlides } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

   // const results;
   pagerStatus = true;
   reachedEnd;

   @ViewChild('slides', {static: true}) ionSlides: IonSlides;

  constructor(
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {
    console.log(this.ionSlides);
    // this.ionSlides.lockSwipeToPrev(true);
  }

  onboardingDone() {
    this.storage.set('onboarded', 1);
    this.router.navigate(['/tabs/favourites']);
  }

  slideReachedEnd() {
    this.pagerStatus = false;
    this.ionSlides.lockSwipeToNext(false);
    this.reachedEnd = true;
  }

  nextSlide() {
    this.ionSlides.slideNext();
  }

  previousSlide() {
    this.ionSlides.slidePrev();

    if (this.reachedEnd === true) {
      this.pagerStatus = true;

    }
  }

}
