import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-lines-tab',
  templateUrl: './lines-tab.page.html',
  styleUrls: ['./lines-tab.page.scss'],
})
export class LinesTabPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  public openLineDetail(event, idLine) {
    event.stopPropagation();
    this.router.navigateByUrl('tabs/lines/line-detail/' + idLine);
  }

}
