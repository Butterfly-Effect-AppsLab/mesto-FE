import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'bike', loadChildren: './bikes/bike.module#BikePageModule'},
  { path: 'details', loadChildren: './details/details.module#DetailsPageModule' },
  { path: 'bikes-map', loadChildren: './bikes-map/bikes-map.module#BikesMapPageModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
