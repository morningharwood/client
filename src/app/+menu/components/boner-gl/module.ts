import { NgModule } from '@angular/core';
import { BonerGlDirective } from './boner-gl.directive';

const EXPORT_DECLARATIONS = [
  BonerGlDirective,
];

@NgModule({
  imports: [],
  declarations: [
    ...EXPORT_DECLARATIONS
  ],
  exports: [
    ...EXPORT_DECLARATIONS
  ]
})
export class BonerGlModule {

}
