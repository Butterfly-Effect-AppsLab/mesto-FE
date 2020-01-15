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
  filterData: any;
  lines;
  res;
  noData = false;

  constructor(
    private router: Router,
    private linesService: LinesService
  ) { }

  ngOnInit() {

    this.getAllLinesData();
    /*
    this.linesService.fetchLineDirections$(1).subscribe(directions => {
      this.lineDirection = directions;
    });
    */
  }

  public getAllLinesData() {
    this.linesService.fetchLines$().subscribe(
      results => {
        // console.log(results);
        this.linesData = results;
      });
  }

  public openLineDetail(event, idLine) {
    console.log(idLine);
    event.stopPropagation();
    this.router.navigateByUrl('tabs/lines/line-detail/' + idLine);
  }

  public filterLines(ev) {

    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.linesData = this.linesData.filter((name) => {

        this.res = name.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
        if (this.res === false) {
          this.noData = true;
        } else {
          this.noData = false;
          return this.res;
        }

      });
      console.log(name);
    } else {
      this.getAllLinesData();
      this.noData = false;
    }
  }

}
