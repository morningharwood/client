import { Component, OnInit } from '@angular/core';
import { pulseData$ } from '../../_handies/observable';
import { bogo } from '../../_handies/sorting';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

import {
  initalState,
  Item,
  RunningHeader,
} from '../components/running-head/running-head.content';
import { Observable } from 'rxjs/Observable';
import {
  MatchMediaService as MMS,
} from '../../_handies/window/match-media';


function setEndWidth() {
  if(MMS.bp('sm')){
    return '70vw';
  } else {
    return '30vw';
  }
}

function setStartWidth() {
  if(MMS.bp('sm')){
    return '0px';
  } else {
    return '20vw';
  }
}

@Component({
  moduleId: module.id,
  selector: 'menu-container',
  templateUrl: 'menu.html',
  styleUrls: ['./menu.scss'],
  // animations: [
  //   trigger('goodmorning', [
  //     state('void', style({
  //       'width': '0',
  //       'transform': 'rotate(0)',
  //       'transform-origin': '0 0'
  //     })),
  //     state(MMS.generateBpStateName('harwood', 'sm'), style({
  //       'width': setEndWidth(),
  //       'transform': 'rotate(-30deg)',
  //       'transform-origin': '0 0'
  //     })),
  //     transition('void => *', animate(2000, keyframes([
  //       style({
  //         'width': '0',
  //         'transform': 'rotate(0)',
  //         'transform-origin': '0 0'
  //       }),
  //       style({
  //         'width': setStartWidth(),
  //         'transform': 'rotate(0)',
  //         'transform-origin': '0 0'
  //       }),
  //       style({
  //         'width': setEndWidth(),
  //         'transform': 'rotate(-30deg)',
  //         'transform-origin': '0 0'
  //       })
  //     ])))
  //   ])
  // ]
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
