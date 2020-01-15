import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LinesService } from '../../services/api/lines.service';
import { LoadingController } from '@ionic/angular';

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
  loader;
  noData = false;

  constructor(
    private router: Router,
    private linesService: LinesService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {

    this.getAllLinesData();
    /*
    this.linesService.fetchLineDirections$(1).subscribe(directions => {
      this.lineDirection = directions;
    });
    */
  }

  async presentLoading() {
    this.loader = await this.loadingController.create({
      message: 'Loading',
      duration: 6000
    });
    await this.loader.present();

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  public getAllLinesData() {
    this.presentLoading();
    this.linesService.fetchLines$().subscribe(
      results => {
        // console.log(results);
        this.loaded = true;
        this.loader.dismiss();
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
              return this._removeAccents(direction.toLowerCase()).indexOf(this._removeAccents(val.toLowerCase())) !== -1;
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

  _removeAccents(source: string) {
    if (typeof String.prototype.normalize === 'function') {
      // prevedie string na Unicode normalizaciu a vyhodi specialne znaky - interpunkciu a pod.
      return source.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    // TODO: add fallback solution using regex
    return source;
  }

}
