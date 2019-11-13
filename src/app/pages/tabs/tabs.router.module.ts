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
        path: 'routes',
        children: [
          {
            path: '',
            loadChildren: '../routes-tab/routes-tab.module#RoutesTabPageModule'
          }
        ]
      },
      /*
      {
        path: 'stops',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          }
        ]
      },
      */
      {
        path: '',
        redirectTo: '/tabs/favourites',
        pathMatch: 'full'
      }
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
