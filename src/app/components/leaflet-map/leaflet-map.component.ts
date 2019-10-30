import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { SlovnaftService } from '../../services/slovnaft.service';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';

@Component({
  selector: 'leaflet-map',
  templateUrl: 'leaflet-map.component.html'
})

export class LeafletMapComponent implements OnInit {

  @Input() bikeData;

  map: Map;
  results: any;

  constructor(
    private geolocation: Geolocation,
    private plt: Platform,
    ) {
    }

  @ViewChild('leafletMap', {static: true}) mapElement: ElementRef;

  ngOnInit() {
    const DOMmapElement = this.mapElement.nativeElement;
  //  DOMmapElement.attributes['id'].value;
    this.leafletMap();

    if (this.bikeData && this.bikeData.length) {
      for (const location of this.bikeData) {
        this.addMarker(location.GpsLat, location.GpsLon, location.Name);
      }
    }
    // this.loadMarker();
    // console.log(this.leafletMap.nativeElement.removeAttribute('id'));
    // this.pRef.nativeElement.innerHTML = 'DOM updated successfully!!!';
  }

  // current position moze byt aj ako vstupny parameter ale aj vnutri komponentu
  // markere dat ako vstupny parameter - array

  leafletMap() {

    // In setView add latLng and zoom
    this.map = new Map(this.mapElement.nativeElement).setView([48.14816, 17.10674], 16);
    // this.map = new Map(this.mapElement.nativeElement).setView([11.206051, 122.447886], 8);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '',
    }).addTo(this.map);
    // this.map.invalidateSize();
    // this.loadMarker();
/*
    for (const locs of locations) {
      console.log(locs[0]);
      marker([locs[1], locs[2]]).addTo(this.map)
        .bindPopup('Tu som ')
        .openPopup();

    }
*/
    this.plt.ready().then(() => {

        this.geolocation.getCurrentPosition().then((resp) => {
         // resp.coords.latitude
         // resp.coords.longitude
         // console.log(resp);
        }).catch((error) => {
          console.log('Error getting location', error);
        });

        const watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
         // data can be a set of coordinates, or an error (if an error occurred).
         // data.coords.latitude
         // data.coords.longitude
        });
      }); // plt

    } // leafletMap

    ionViewWillLeave() {
      this.map.remove();
    }

    addMarker(latitude, longitude, text = '') {
      const mapMarker = marker([latitude, longitude], 15);
      mapMarker
        .bindPopup(text)
        .addTo(this.map)
        .openPopup();
    }

    loadMarker() {
      // this.marker = marker([48.14816, 17.10674], 15);
      // this.marker.addTo(this.map)
      // .bindPopup('Hey, I\'m Here')
      // .openPopup();
      // this.map.setView(latLong);
      /*
      const locations = [
        ['LOCATION_1', 11.8166, 122.0942],
        ['LOCATION_2', 11.9804, 121.9189],
        ['LOCATION_3', 10.7202, 122.5621]
      ];
      console.log(locations);
      for (const locs of locations) {
        console.log(locs[1]);
        marker([locs[1], locs[2]]).addTo(this.map)
          .bindPopup('Tu som ')
          .openPopup();

      }
      */
    }


}
