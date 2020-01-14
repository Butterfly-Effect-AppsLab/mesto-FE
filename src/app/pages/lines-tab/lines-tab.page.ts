import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LinesService } from '../../services/api/lines.service';

@Component({
  selector: 'app-lines-tab',
  templateUrl: './lines-tab.page.html',
  styleUrls: ['./lines-tab.page.scss'],
})
export class LinesTabPage implements OnInit {

  linesData: any;
  lineDirection: any;

  constructor(
    private router: Router,
    private linesService: LinesService
  ) { }

  ngOnInit() {

    this.getAllLinesData();
    // console.log(this.linesService.fetchLineDirections$(1));
  }

  public getAllLinesData() {
    this.linesService.getLinesData().subscribe(
      results => {
        this.linesData = results.lines,
        console.log('All' + this.linesData);
      });
  }

  public openLineDetail(event, idLine) {
    event.stopPropagation();
    this.router.navigateByUrl('tabs/lines/line-detail/' + idLine);
  }

}
