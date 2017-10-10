import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostBinding,
} from '@angular/core';
import { Item } from './item.interface';
import {
  animate,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import {
  flyInRevealAnimation,
  flyInRevealNframe,
} from '../../../../_animations/fly-in-reveal/fly-in-reveal';
import { materialDesignCurve } from '../../../../_animations/material-design';


@Component({
  selector: 'nav-item',
  templateUrl: './item.component.html',
  styleUrls: [ 'item.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animate', [
      transition('* => entered', [
        style({
          opacity: 0,
          transform: 'translateY(100px)'
        }),
        animate(materialDesignCurve, style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ])
    ])
  ]
  //   transition('void => entered', useAnimation(flyInRevealAnimation, {
  //     params: {
  //       time: '4000ms',
  //       startPos: '-100px',
  //       endPos: '0',
  //     },
  //   }))
  // ],
})
export class ItemComponent {
  @Input() data: Item;
  @Input() index: number;

  public enterState: string = 'entered';

}
