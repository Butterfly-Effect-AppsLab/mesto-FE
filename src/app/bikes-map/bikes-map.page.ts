import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SlovnaftService } from '../services/slovnaft.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bikes-map',
  templateUrl: 'bikes-map.page.html'
})

export class BikesMapPage implements OnInit {

  bikeData: any;

  constructor(private geolocation: Geolocation,
              private plt: Platform,
              private slovnaftService: SlovnaftService
              ) {}

  ngOnInit() {
    this.slovnaftService.getData().subscribe(
      results => this.bikeData = results.Info
    );
  }

}
