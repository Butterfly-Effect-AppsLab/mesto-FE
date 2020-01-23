import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fav-line-card',
  templateUrl: './fav-line-card.component.html',
  styleUrls: ['./fav-line-card.component.scss'],
})
export class FavLineCardComponent implements OnInit {

  @Input() favLinesData;

  constructor() { }

  ngOnInit() {}

  clickMe() {
    console.log('You just clicked me, oh my.');
  }

}
