import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'leaflet-map',
  templateUrl: 'leaflet-map.component.html'
})

export class LeafletMapComponent implements OnInit {

  map: Map;

  constructor(
    private geolocation: Geolocation,
    private plt: Platform,
    ) {
    }

  @ViewChild('leafletMap')
  public mapElement: ElementRef;

  ngOnInit() {
    const DOMmapElement = this.mapElement.nativeElement;
  //  DOMmapElement.attributes['id'].value;
    this.leafletMap();
    // console.log(this.leafletMap.nativeElement.removeAttribute('id'));
    // this.pRef.nativeElement.innerHTML = 'DOM updated successfully!!!';
  }

  // current position moze byt aj ako vstupny parameter ale aj vnutri komponentu
  // markere dat ako vstupny parameter - array
  // ViewChild template TODO pozriet ako sa to robi. potom cez decorator...

  leafletMap() {
    // In setView add latLng and zoom
    this.map = new Map(this.mapElement.nativeElement).setView([48.14816, 17.10674], 16);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '',
    }).addTo(this.map);
    // this.map.invalidateSize();
    marker([48.14816, 17.10674]).addTo(this.map)
      .bindPopup('Tu som')
      .openPopup();
      /*
      this.plt.ready().then(() => {

        this.geolocation.getCurrentPosition().then((resp) => {
         // resp.coords.latitude
         // resp.coords.longitude
         // console.log(resp);
        }).catch((error) => {
          console.log('Error getting location', error);
        });

        let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
         // data can be a set of coordinates, or an error (if an error occurred).
         // data.coords.latitude
         // data.coords.longitude
        });
      }); // plt
      */
    } // leafletMap

    ionViewWillLeave() {
      this.map.remove();
    }


}
