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

export class BikesMapPage implements OnInit {

    results: Results[] = [];
    public bikeData;

    constructor(private geolocation: Geolocation,
                private plt: Platform,
                private slovnaftService: SlovnaftService
                ) {}

  ngOnInit() {
    this.loadMarker();
    this.bikeData = this.slovnaftService.getData().subscribe(
      (results: Results[]) => {
        let resources = results['Info'];
        this.results = resources;
        // console.log(this.results[0]);
      }
    );

  }

}
