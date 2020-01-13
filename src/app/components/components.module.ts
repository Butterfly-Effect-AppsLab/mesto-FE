import { NgModule } from '@angular/core';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { FavStopCardComponent } from './fav-stop-card/fav-stop-card.component';
import { FavLineCardComponent } from './fav-line-card/fav-line-card.component';
import { LineCardComponent } from './line-card/line-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    LeafletMapComponent,
    FavStopCardComponent,
    FavLineCardComponent,
    LineCardComponent,
  ],
  imports: [IonicModule],
  exports: [
    LeafletMapComponent,
    FavStopCardComponent,
    FavLineCardComponent,
    LineCardComponent
  ]
})
export class ComponentsModule {

}
