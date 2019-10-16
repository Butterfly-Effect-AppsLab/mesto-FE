import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  showModal() {
    console.log('hello word;');
  }

  map: Map;

  ionViewDidEnter() { this.leafletMap(); }

  constructor(private geolocation: Geolocation, private plt: Platform, public toastController: ToastController) {}

  leafletMap() {
    // In setView add latLng and zoom
    this.map = new Map('mapId').setView([48.14816, 17.10674], 16);
    tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'haha',
    }).addTo(this.map);

    marker([48.14816, 17.10674]).addTo(this.map)
      .bindPopup('Tu som')
      .openPopup();

      this.plt.ready().then(() => {

        this.geolocation.getCurrentPosition().then((resp) => {
         // resp.coords.latitude
         // resp.coords.longitude
         //console.log(resp);
        }).catch((error) => {
          console.log('Error getting location', error);
        });

        let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
         // data can be a set of coordinates, or an error (if an error occurred).
         // data.coords.latitude
         // data.coords.longitude
        });
      }) //plt
    } //leafletMap

  /** Remove map when we have multiple map object */
  /*
  ionViewWillLeave() {
    this.map.remove();
  }
  */

}
