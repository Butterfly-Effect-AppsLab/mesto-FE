import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { LeafletMapComponent } from './leaflet-map/leaflet-map.page';

const routes: Routes = [
  {
    path: '',
    component: MapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeafletMapComponent]
})
export class LeafletComponentModule {}
