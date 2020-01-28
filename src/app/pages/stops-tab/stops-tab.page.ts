import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StopsService } from 'src/app/services/api/stops/stops.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-stops-tab',
  templateUrl: './stops-tab.page.html',
  styleUrls: ['./stops-tab.page.scss'],
})
export class StopsTabPage implements OnInit {

  buttonIcon = 'heart-empty';
  heartClass;
  stopsData: any = [];
  filterStopsData: any = [];
  loaded = false;
  noData = false;

  constructor(
    public toastController: ToastController,
    private router: Router,
    private stopsService: StopsService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getAllStopsData();
  }

  public getAllStopsData() {
    this.utilsService.presentLoading('', 2000);
    this.stopsService.getStopsData().subscribe(
      results => {
        this.loaded = true;
        this.stopsData = results.stops;
        this.utilsService.dismissLoader();
        this.filterStopsData = this.stopsData;
      }
    );
  }

  public getStoLinesData(idStop) {
    this.stopsService.getStopLines(idStop).subscribe(
      results => {
        console.log('Stop lines ' + results);
      }
    );
  }

  public filterStops(ev) {

    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.filterStopsData = this.stopsData.filter(
        stop => {
              return this.utilsService.normalizeSearchString(
                stop.stop_name.toLowerCase()).indexOf(
                  this.utilsService.normalizeSearchString(
                    val.toLowerCase())) !== -1;
        });
    } else {
      this.getAllStopsData();

    }
  }

  public openStopDetail(event) {
    event.stopPropagation();
    this.router.navigateByUrl('tabs/stops/stop-detail/');
  }

}
