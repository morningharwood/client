import {
  Inject,
  Injectable,
  PLATFORM_ID,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { MatchMediaService } from './match-media';
import { Observable } from 'rxjs/Observable';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/window';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/repeat';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/takeLast';

export enum Orientations {
  PORTRAIT,
  LANDSCAPE,
  SQUARE
}

@Injectable()
export class AspectRatioService {
  private _platformId: string;
  constructor(@Inject(PLATFORM_ID) platformId: string,
              private _mms:MatchMediaService) {
    this._platformId = platformId;
  }

  private _notBrowser():boolean {
    return !isPlatformBrowser(this._platformId);
  }

  public isLandscape(): boolean {
    if(this._notBrowser()) return;
    return (
      window.matchMedia('(orientation: landscape)').matches
      || window.innerWidth > window.innerHeight);

  }

  public isPortrait(): boolean {
    if(this._notBrowser()) return;
    return (
      window.matchMedia('(orientation: portrait)').matches
      || window.innerWidth < window.innerHeight
    );
  }

  public isOrientation(event): Orientations {
    // console.log(event);
    if(this.isLandscape()){
      return Orientations['1'];
    } else if(this.isPortrait()) {
      return Orientations['0'];
    } else {
      return Orientations['3'];
    }
  }

  public static getOrientations():Array<string> {
    return Object.keys(Orientations).filter(key => !isNaN(Number(Orientations[key])));;
  }
}
