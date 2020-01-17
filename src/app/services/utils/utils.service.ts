import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loader = null;
  source;

  constructor(
    private loadingController: LoadingController
  ) { }

  async presentLoading(message: string = null, duration: number = null) {
    // Dismiss previously created loading
        if (this.loader != null) {
            this.loader.dismiss();
        }

        this.loader = await this.loadingController.create({
            duration: duration,
            message: message
        });

        return await this.loader.present();
  }

  async dismissLoader() {
    if (this.loader != null) {

            await this.loadingController.dismiss();
            this.loader = null;
        }
    return;
  }

  _removeAccents(source: string) {
    if (typeof String.prototype.normalize === 'function') {
      // prevedie string na Unicode normalizaciu a vyhodi specialne znaky - interpunkciu a pod.
      return source.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    // TODO: add fallback solution using regex
    return source;
  }

  public normalizeSearchString(sourceString) {
    return this._removeAccents(sourceString);
  }


}
