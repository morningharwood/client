


import {
  Directive,
  HostBinding,
  OnInit,
} from '@angular/core';


@Directive({
  selector: '[sundialTrigger]'
})
export class SundialTriggerDirective implements OnInit{
  @HostBinding('class') themeClass = 'light-filter';

  constructor() {}

  ngOnInit() {
    console.log('imma child');
  }
}
