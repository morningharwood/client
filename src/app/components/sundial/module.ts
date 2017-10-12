import { NgModule } from '@angular/core';
import { SundialContainerDirective } from './sundial-container';
import { SundialTriggerDirective } from './sundial-trigger';

const EXPORTS_AND_DECLARATIONS = [
  SundialContainerDirective,
  SundialTriggerDirective
];

@NgModule({
  exports: [...EXPORTS_AND_DECLARATIONS],
  declarations: [...EXPORTS_AND_DECLARATIONS]
})
export class SundialModule {

}
