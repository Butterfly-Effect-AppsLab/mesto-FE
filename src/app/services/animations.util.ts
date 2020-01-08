import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export default class AnimationsUtil {
		constructor(
			private toastController: ToastController
		) {}

		public showMessage(toastText) {
			this.toastController.getTop().then(top => {
	      if (top) {
	        this.toastController.dismiss();
	      }
	    })
			
      this.toastController.create({
        message: toastText,
        duration: 5000,
        animated: true,
        cssClass: 'customToast',
        position: 'bottom',
        buttons: [
          {
            side: 'end',
            icon: 'close'
          }],
        color: 'dark'
      }).then((obj) => {
        obj.present();
      });
    }
}
