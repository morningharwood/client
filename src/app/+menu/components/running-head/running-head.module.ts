/**
 * Created by matth on 2/19/2017.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunningHeadComponent } from './running-head.component';


@NgModule({
  imports: [ CommonModule ],
  declarations: [ RunningHeadComponent ],
  exports: [ RunningHeadComponent ],
})
export class RunningHeadModule {
}
