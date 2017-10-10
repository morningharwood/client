import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  HostBinding,
  OnInit,
} from '@angular/core';
import {
  transition,
  trigger,
  useAnimation,
  sequence,
  state,
  style,
} from '@angular/animations';
import { grow } from './boner.animation';
import { MatchMediaService } from '../../../_handies/window/match-media';
import { ObservableMedia } from '@angular/flex-layout';
import {
  AspectRatioService,
  Orientations,
} from '../../../_handies/window/aspect-ratio';

//
// const growNframe = {
//   transform: 'rotate(-30deg)',
//   width: '33%',
// };
// const standardGrow = {
//   time: 3000,
//   start: 0,
//   endStep1: 20,
//   end: 30,
//   degStart: 0,
//   degEnd: 30,
//   originStart: 0,
//   originEnd: 100,
// };
//
// animations: [
//   trigger('boner', [
//     ...AspectRatioService.getOrientations().map((size) => {
//       return state(`open-${size}`, style({
//         ...growNframe,
//         width: size === 'PORTRAIT' ? `66.6666%` : `33.333%`,
//
//       }));
//     }),
//     ...AspectRatioService.getOrientations().map((size) => {
//       return transition(`* => open-${size}`, sequence([
//         useAnimation(grow, {
//           params: {
//             ...standardGrow,
//             end: size === 'PORTRAIT' ? 66.6666 : 33.333,
//
//           },
//         }),
//       ]));
//     })
//   ])
// ],

console.log(AspectRatioService.getOrientations());
@Component({
  selector: 'boner',
  templateUrl: './boner.component.html',
  styleUrls: [ './boner.component.scss' ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// you can checkout the ObservableMedia from '@angular/flex-layout'
export class BonerComponent implements OnInit {
  constructor(private bm: ObservableMedia,
              private _ars: AspectRatioService,
              private _mms: MatchMediaService) {
  }

  public ngOnInit() {
  }
}
