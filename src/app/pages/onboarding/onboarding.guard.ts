import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable()
export class OnboardingGuard implements CanActivate {

	constructor(
		private router: Router,
		private storage: Storage
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return true;

		return this.storage.get('onboarded').then(
			val => {
				if (!val) {
					return true;
				}

	   		this.router.navigate(['/home']);
			}
		);
  }
}
