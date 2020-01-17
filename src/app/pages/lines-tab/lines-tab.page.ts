import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LinesService } from '../../services/api/lines.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-lines-tab',
  templateUrl: './lines-tab.page.html',
  styleUrls: ['./lines-tab.page.scss'],
})
export class LinesTabPage implements OnInit {

  linesData: any = [];
  lineDirection: any;
  filterData: any = [];
  lines;
  loaded = false;
  noData = false;

  loader = null;

  constructor(
    private router: Router,
    private linesService: LinesService,
    private utilsService: UtilsService
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
    this.utilsService.presentLoading('', 2000);
    this.linesService.fetchLines$().subscribe(
      results => {
        this.loaded = true;
        this.utilsService.dismissLoader();
        this.linesData = results;
        this.filterData = this.linesData;
      });
  }

  public filterLines(ev) {

    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.filterData = this.linesData.filter(
        line => {
          const dir = line.directions.find(
            direction => {
              return this.utilsService.normalizeSearchString(
                direction.toLowerCase()).indexOf(
                  this.utilsService.normalizeSearchString(
                    val.toLowerCase())) !== -1;
            }
          );
          return (
            line.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
            typeof dir !== 'undefined'
          );
        }
      );
      // console.log(name);
    } else {
      this.getAllLinesData();
      this.noData = false;
    }
  }

}
