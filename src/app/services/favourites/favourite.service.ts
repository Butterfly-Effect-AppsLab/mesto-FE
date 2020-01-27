import { Injectable } from '@angular/core';
import AnimationsUtil from '../animations.util';
import { BehaviorSubject } from 'rxjs';
import { InternalStorageService } from '../storage/internal-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  buttonIcon = 'heart-empty';
  heartClass;
  private favouriteLines$ = new BehaviorSubject<any>([]);
  private favouriteStops$ = new BehaviorSubject<any>([]);

  constructor(
    private animationsUtil: AnimationsUtil,
    private internalStorage: InternalStorageService
  ) {
    this.internalStorage.getFavouriteStops().then(stops => this.favouriteStops$.next(stops || []));
    this.internalStorage.getFavouriteLines().then(lines => this.favouriteLines$.next(lines || []));
  }

  addLineToFavourites(id, direction, stop) {
    const lines = this.favouriteLines$.getValue();
    lines.push({id, direction, stop});
    this.favouriteLines$.next(lines);
    this.internalStorage.setFavourites('lines', lines);
  }

  addStopToFavourites(id) {
    const stops = this.favouriteStops$.getValue();
    stops.push(id);
    this.favouriteStops$.next(stops);
    this.internalStorage.setFavourites('stops', stops);
  }

  removeLineFromFavourites(id, direction, stop) {
    let lines = this.favouriteLines$.getValue();
    lines = lines.filter(line => line.id !== id && line.direction !== direction);
    this.favouriteLines$.next(lines);
    this.internalStorage.setFavourites('lines', lines);
  }

  removeStopFromFavourites(id) {
    let stops = this.favouriteStops$.getValue();
    stops = stops.filter(stop => parseInt(stop, 10) !== id);
    this.favouriteStops$.next(stops);
    this.internalStorage.setFavourites('stops', stops);
  }

  getFavouriteLines$() {
    return this.favouriteLines$;
  }

  getFavouriteStops$() {
    return this.favouriteStops$;
  }
}
