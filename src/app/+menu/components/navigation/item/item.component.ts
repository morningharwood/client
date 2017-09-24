import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Item } from './item.interface';

@Component({
  selector: 'nav-item',
  templateUrl: './item.component.html',
  styleUrls: ['item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  @Input() data: Item;
  @Input() index: number;
}
