import { Component, OnInit } from '@angular/core';
import { pulseData$ } from '../../_handies/observable';
import { bogo } from '../../_handies/sorting';

import {
  initalState,
  Item,
  RunningHeader,
} from '../components/running-head/running-head.content';
import { Observable } from 'rxjs/Observable';
import {
  MatchMediaService as MMS,
} from '../../_handies/window/match-media';


@Component({
  moduleId: module.id,
  selector: 'menu-container',
  templateUrl: 'menu.html',
  styleUrls: ['./menu.scss'],
})
export class MenuContainer implements OnInit {
  private state_: RunningHeader;
  public state$: Observable<Item>;
  constructor(private mediaMatchService: MMS) {
  }

  public ngOnInit() {
    // this.mediaMatchService.onResize$.subscribe(console.log);
    this.state_ = bogo(initalState);
    this.state$ = pulseData$(this.state_, 'name');
  }
}
