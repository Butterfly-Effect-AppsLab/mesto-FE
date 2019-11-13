import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OnboardingGuard } from './pages/onboarding/onboarding.guard';

const routes: Routes = [
  { path: '', redirectTo: 'onboarding', pathMatch: 'full' },
  /* { path: '',
      redirectTo: 'tabs', pathMatch: 'full'
  },*/
  { path:
      'home',
        loadChildren: () => import('./pages/home/home.module')
          .then( m => m.HomePageModule)},
  { path:
      'bike',
        loadChildren: './pages/bikes/bike.module#BikePageModule'
  },
  { path:
      'details',
        loadChildren: './pages/details/details.module#DetailsPageModule'
  },
  { path:
      'bikes-map',
        loadChildren: './pages/bikes-map/bikes-map.module#BikesMapPageModule'
  },
  /*
  { path:
      'favourite-tab',
        loadChildren:
          './pages/favourite-tab/favourite-tab.module#FavouriteTabPageModule'
  },
  { path:
      'routes-tab',
        loadChildren: './pages/routes-tab/routes-tab.module#RoutesTabPageModule'
  },
  */
  { path:
      'tabs',
        loadChildren: './pages/tabs/tabs.module#TabsPageModule'
  },
  {
    path: 'onboarding',
    loadChildren: './pages/onboarding/onboarding.module#OnboardingPageModule',
    canActivate: [OnboardingGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers:  [OnboardingGuard]
})
export class AppRoutingModule { }
