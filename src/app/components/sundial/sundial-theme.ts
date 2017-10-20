


import {
  Directive,
  HostBinding,
  OnInit,
} from '@angular/core';
import {
  Store,
} from '@ngrx/store';
import * as fromGnomon from './reducers'
import * as gnomon from './actions';
import { Observable } from 'rxjs/Observable';


@Directive({
  selector: '[sundialTheme]'
})
export class SundialThemeDirective implements OnInit {
  @HostBinding('class') theme = 'light';

  private gnomon: Observable<any>;

  constructor(private store: Store<fromGnomon.State>) {
    this.gnomon = store.select<any>('gnomon');
  }

  ngOnInit() {
    this.gnomon.subscribe((theme) => {
      if(theme.currentHour >= 7 && theme.currentHour <= 11){
        this.theme = 'sepia';
      } else if( theme.currentHour >= 12 && theme.currentHour <= 18) {
        this.theme = 'light'
      } else {
        this.theme = 'dark'
      }
    });
  }
}
