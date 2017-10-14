import { NgModule } from '@angular/core';
import { SundialContainerDirective } from './sundial-container';
import { SundialTriggerDirective } from './sundial-trigger';
import { StoreModule } from '@ngrx/store';
import {reducer} from './reducers';

const EXPORTS_AND_DECLARATIONS = [
  SundialContainerDirective,
  SundialTriggerDirective
];

@NgModule({
  imports: [
    StoreModule.forFeature('gnomon', {gnomon: reducer})
  ],
  exports: [...EXPORTS_AND_DECLARATIONS],
  declarations: [...EXPORTS_AND_DECLARATIONS]
})
export class SundialModule {

}
