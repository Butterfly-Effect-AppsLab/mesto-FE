import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SlovnaftService } from '../../services/slovnaft.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeparturesService } from 'src/app/services/api/departures/departures.service';

@Component({
  selector: 'app-bikes-map',
  templateUrl: 'bikes-map.page.html'
})

export class BikesMapPage implements OnInit {

  bikeData: any;
  platformData: any;

  constructor(private geolocation: Geolocation,
              private plt: Platform,
              private slovnaftService: SlovnaftService,
              private departures: DeparturesService
              ) {}

  ngOnInit() {
    this.slovnaftService.getData().subscribe(
      results => this.bikeData = results.Info
    );

    this.getPlatformsData().subscribe(
      results => {
        this.platformData = results;
        console.log('plt: ' + results);
    });

  }

  public getPlatformsData() {
    return this.departures.getPlatforms();
  }

}
