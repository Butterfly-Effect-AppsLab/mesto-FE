import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

   // const results;
   //@ViewChild('slides') ionSlides: ElementRef;

  constructor() {}

  ngOnInit() {
    // const DOMSlide = this.ionSlides.nativeElement;
    
  }

/*
  slideChanged() {
    //console.log(this.DOMSlide);
    // const currentIndex = this.slides.getActiveIndex().then((data) => {
    const isLastSlide = this.ionSlides.isEnd().then((isEnd) => {
       this.results = isEnd;
       console.log(this.results);
       // tu potrebujem nastavit [pager] = 'false'
       console.log(this.DOMSlide);
     });
    return this.results;
  }
*/
}
