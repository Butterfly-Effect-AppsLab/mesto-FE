import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { SlovnaftService } from '../../services/slovnaft.service';
// import { Map, latLng, tileLayer, Layer, marker, LeafIcon } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'leaflet-map',
  templateUrl: 'leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss'],
})

export class LeafletMapComponent implements OnInit {

  @Input() bikeData;

  map: L;
  results: any;
  busStops = {
      stops: [
         {lat: '48.14790', long: '17.12530', linky: '4, 201, 209'},
         {lat: '48.14441', long: '17.12690', linky: '50, 68'},
         {lat: '48.14555', long: '17.12940', linky: '4'}
      ]
   };

  constructor(
    private geolocation: Geolocation,
    private plt: Platform,
    ) {
    }

  @ViewChild('leafletMap', {static: true}) mapElement: ElementRef;

  ngOnInit() {
    const DOMmapElement = this.mapElement.nativeElement;
    this.leafletMap();

    if (this.bikeData && this.bikeData.length) {
      for (const location of this.bikeData) {
        this.addMarker(location.GpsLat, location.GpsLon, location.Name);
      }

      console.log(this.busStops.stops);

      for (const busLocation of this.busStops.stops) {
        this.addStops(busLocation.lat, busLocation.long, busLocation.linky);
      }

    }

    // this.addStops(48.14816, 17.10674, 'Trnavske myto');
    // const greenIcon = new LeafIcon({iconUrl: 'assets/marker.png'});
    // this.loadMarker();
    // console.log(this.leafletMap.nativeElement.removeAttribute('id'));
    // this.pRef.nativeElement.innerHTML = 'DOM updated successfully!!!';
  }

  leafletMap() {

    // In setView add latLng and zoom
    this.map = new L.Map(this.mapElement.nativeElement).setView([48.14593, 17.12636], 15);
    // this.map = new Map(this.mapElement.nativeElement).setView([11.206051, 122.447886], 8);
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
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

      const dot = L.icon({
        // iconUrl: './assets/icon/marker.png',
        iconUrl: './assets/icon/mapa/zastavka.png',
        shadowUrl: 'dot-shadow.png',
        iconSize: [45, 55], // size of the icon
        popupAnchor: [0, -15], // point from which the popup should open relative..
        title: 'hello'
      });

      const mapMarker = L.marker([latitude, longitude], { icon: dot }, 15);
      mapMarker
        .bindPopup(text)
        .addTo(this.map);
        // .openPopup();
    }

    addStops(latitude, longitude, text) {

      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: '<div class="countGreen">6/7</div><img src="./assets/icon/mapa/slovnaftbajk.png" class="markerIcon">',
        iconSize: [50, 50],
        iconAnchor: [15, 10]
      });

      console.log(icon);

      const station = L.icon({
          // iconUrl: './assets/icon/bus_marker.png',
          shadowUrl: 'dot-shadow.png',
          iconSize: [38, 38], // size of the icon
          popupAnchor: [0, -15], // point from which the popup should open relative..
          title: 'hello',
          html: '2'
        });

      const mapBusMarker = L.marker([latitude, longitude], { icon }, 15)
        .addTo(this.map)
        .on('click', function(e) {
          console.log('aaa');
        });
      // mapBusMarker
          // .bindPopup(text)
          // .addTo(this.map);
    }

     markerOnClick() {
	      alert('hi. you clicked the marker at');
      }
}
