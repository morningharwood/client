import {
  Directive,
  OnInit,
} from '@angular/core';


@Directive({
  selector: '[sunDialContainer]'
})
export class SundialContainerDirective implements OnInit {
  constructor() {}
  ngOnInit() {
    console.log(new Date());
  }
}
