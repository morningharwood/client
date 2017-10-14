


import {
  Directive,
  HostBinding,
  OnInit,
} from '@angular/core';
import {
  createSelector,
  Store,
} from '@ngrx/store';
import * as fromGnomon from './reducers'
import * as gnomon from './actions';
import { Observable } from 'rxjs/Observable';


@Directive({
  selector: '[sundialTrigger]'
})
export class SundialTriggerDirective implements OnInit {
  @HostBinding('class') themeClass = 'light-filter';
  private gnomon: Observable<any>;
  constructor(private store: Store<fromGnomon.State>) {
    this.gnomon = store.select<any>('gnomon');
  }

  ngOnInit() {
    this.gnomon.subscribe(console.log);
    this.store.dispatch(new gnomon.Daytime());
  }
}
