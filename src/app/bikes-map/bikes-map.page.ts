import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SlovnaftService } from '../services/slovnaft.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bikes-map',
  templateUrl: 'bikes-map.page.html'
})

export class BikesMapPage {

  constructor(private geolocation: Geolocation,
              private plt: Platform,
              private slovnaftService: SlovnaftService) {}

}
