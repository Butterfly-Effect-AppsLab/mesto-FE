import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'favourites',
        children: [
          {
            path: '',
            loadChildren:
              '../favourite-tab/favourite-tab.module#FavouriteTabPageModule'
          }
        ]
      },
      {
        path: 'lines',
        children: [
          {
            path: '',
            loadChildren: '../lines-tab/lines-tab.module#LinesTabPageModule'
          }
        ]
      },
      {
        path: 'stops',
        children: [
          {
            path: '',
            loadChildren: '../stops-tab/stops-tab.module#StopsTabPageModule'
          },
          {
            path: 'stop-detail/:stopId',
            loadChildren:
                '../stop-detail/stop-detail.module#StopDetailPageModule'
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: '../bikes-map/bikes-map.module#BikesMapPageModule'
          }
        ]
      }
      /*
      {
        path: '',
        redirectTo: '/tabs/favourites',
        pathMatch: 'full'
      }
      */
    ]
  },
  /*
  {
    path: '',
    redirectTo: '/tabs/tabs/tab1',
    pathMatch: 'full'
  }
  */
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
