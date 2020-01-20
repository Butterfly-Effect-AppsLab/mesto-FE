import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { FavStopCardComponent } from './fav-stop-card/fav-stop-card.component';
import { FavLineCardComponent } from './fav-line-card/fav-line-card.component';
import { LineCardComponent } from './line-card/line-card.component';
import { StopCardComponent } from './stop-card/stop-card.component';
import { LineStopComponent } from './line-stop/line-stop.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    LeafletMapComponent,
    FavStopCardComponent,
    FavLineCardComponent,
    LineCardComponent,
    StopCardComponent,
    LineStopComponent
  ],
  imports: [IonicModule,
            CommonModule],
  exports: [
    LeafletMapComponent,
    FavStopCardComponent,
    FavLineCardComponent,
    LineCardComponent,
    StopCardComponent,
    LineStopComponent
  ]
})
export class ComponentsModule {

}
