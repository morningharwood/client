


import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import {
  Store,
} from '@ngrx/store';
import * as fromGnomon from './reducers'
import * as gnomon from './actions';


@Directive({
  selector: '[sundialTrigger]'
})
export class SundialTriggerDirective {
  @Input() theme: string;

  constructor(private store: Store<fromGnomon.State>) {}

  @HostListener('click')
  setTheme(){
    if(this.theme === 'morning'){
      this.store.dispatch(new gnomon.Morning());
    } else if (this.theme === 'afternoon') {
      this.store.dispatch(new gnomon.Evening())
    } else {
      this.store.dispatch(new gnomon.Afternoon());
    }
  }
}
