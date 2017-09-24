/**
 * Created by matth on 2/20/2017.
 */
import { Item } from './item/item.interface';

export interface Navigation extends Array<Item> {
}

export const data:Navigation = [
  {name: 'work', link: '/work'},
  {name: 'note', link: '/note'},
  {name: 'profile', link: '/profile'},
];
