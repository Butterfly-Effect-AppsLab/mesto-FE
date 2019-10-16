//hore angularovskle z core
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

//potom ionicovske (vendor), napr. rxjs, 3rd party
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { NavController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';

//potom svoje, napr. slovnaftService
import { SlovnaftService } from '../services/slovnaft.service';

@Component({
  selector: 'app-bikes',
  templateUrl: 'bike.page.html'
})
export class BikePage {

  //results: Results[] = [];
  public bikeData;

  constructor(private slovnaftService: SlovnaftService) {}

  ngOnInit() {

    //const bikeObserve = this.slovnaftService.fetchData$();

    this.bikeData = this.slovnaftService.getData().subscribe(
      (results: Results[]) => {
        let resources = results['Info'];
        this.results = resources;
      }
    );
    /*
    bikeObserve.subscribe((resultsData: Results[]) => {
        let resources = resultsData["Info"];
        //let resource = resources[0];
        //console.log(resources[0]['Name']);
      this.results = resources;
      //console.log(this.results);
    });
    */

  }

}
