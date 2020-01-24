import { Injectable } from '@angular/core';
import AnimationsUtil from '../animations.util';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  buttonIcon = 'heart-empty';
  heartClass;

  constructor(private animationsUtil: AnimationsUtil) { }


}
