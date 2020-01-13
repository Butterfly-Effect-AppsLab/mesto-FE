import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LinesService } from '../../services/api/lines.service';

@Component({
  selector: 'app-lines-tab',
  templateUrl: './lines-tab.page.html',
  styleUrls: ['./lines-tab.page.scss'],
})
export class LinesTabPage implements OnInit {

  linesData: any;

  constructor(
    private router: Router,
    private linesService: LinesService
  ) { }

  ngOnInit() {
    this.linesService.fetchLines().subscribe(
      results => this.linesData
    );
  }

  public openLineDetail(event, idLine) {
    event.stopPropagation();
    this.router.navigateByUrl('tabs/lines/line-detail/' + idLine);
  }

}
