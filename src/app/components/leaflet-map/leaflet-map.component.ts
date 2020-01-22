import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RouterModule, Routes, Router } from '@angular/router';

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
  iconStatusClass;
  busStops = {
      stops: [
         {stopId: '1234', lat: '48.14790', long: '17.12530', linky: '4, 201, 209'},
         {stopId: '1211', lat: '48.14441', long: '17.12690', linky: '50, 68'},
         {stopId: '9232', lat: '48.14555', long: '17.12940', linky: '4'}
      ]
   };

  constructor(
    private geolocation: Geolocation,
    private plt: Platform,
    private router: Router,
    ) {
    }

  @ViewChild('leafletMap', {static: true}) mapElement: ElementRef;

  ngOnInit() {
    const DOMmapElement = this.mapElement.nativeElement;
    this.leafletMap();

    if (this.bikeData && this.bikeData.length) {
      for (const location of this.bikeData) {
        this.addSFbike(location.GpsLat,
                       location.GpsLon,
                       location.Name,
                       '',
                       location.DockNum,
                       location.BikeNum,
                       location.Icon
                      );
      }

      console.log(this.bikeData);

      for (const busLocation of this.busStops.stops) {
        this.addStops(busLocation.lat, busLocation.long, busLocation.stopId, busLocation.linky);
        // this.addMarker(location.GpsLat, location.GpsLon, location.Name);
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
    this.map = new L.Map(this.mapElement.nativeElement).setView([48.14790, 17.12530], 15);
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

    // pridanie zastavky do mapy
    addSFbike(latitude, longitude, stopId, text = '',
              maxBikesCount, actualBikesCount, status) {

      if (status === 'low' || status === 'empty') {
        this.iconStatusClass = 'countOrange';
      }
      if (status === 'ok') {
        this.iconStatusClass = 'countGreen';
      }
      if (status === 'high' || status === 'full' || status === 'overload') {
        this.iconStatusClass = 'countRed';
      }

      const dot = L.divIcon({
        className: 'custom-div-icon',
        html: '<div class="' + this.iconStatusClass + '">'
        + actualBikesCount + '/' + maxBikesCount
        + '</div><img src="./assets/icon/mapa/slovnaftbajk.png" class="markerIcon">',
        iconSize: [50, 50],
        iconAnchor: [15, 10]
      });

      const mapMarker = L.marker([latitude, longitude], { icon: dot }, 15);
      mapMarker
        // .bindPopup(text)
        .addTo(this.map)
        .on('click', (e) => {
          console.log('station');
        });
    }

    // pridanie slovnaftbajk markeru
    addStops(latitude, longitude, stopId, text) {

      const icon = L.icon({
        iconUrl: './assets/icon/mapa/zastavka.png',
        shadowUrl: 'dot-shadow.png',
        iconSize: [45, 55], // size of the icon
        popupAnchor: [0, -15], // point from which the popup should open relative..
        title: 'hello'
      });

      // console.log(icon);
      /*
      const station = L.icon({
          // iconUrl: './assets/icon/bus_marker.png',
          shadowUrl: 'dot-shadow.png',
          iconSize: [38, 38], // size of the icon
          popupAnchor: [0, -15], // point from which the popup should open relative..
          title: 'hello',
          html: '2'
        });
      */

      const mapBusMarker = L.marker([latitude, longitude], { icon }, 15)
        .addTo(this.map)
        .on('click', (e) => {
          this.router.navigateByUrl('tabs/stops/stop-detail/' + stopId);
        });
      // mapBusMarker
          // .bindPopup(text)
          // .addTo(this.map);
    }

     markerOnClick() {
       alert('hi. you clicked the marker at');
      }
}
