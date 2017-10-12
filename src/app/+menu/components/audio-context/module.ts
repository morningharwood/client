import { NgModule } from '@angular/core';
import { AudioContextDirective } from './audio-context.directive';


const EXPORTS_DECLARATIONS = [
  AudioContextDirective,
];
@NgModule({
  declarations: [ ...EXPORTS_DECLARATIONS ],
  exports: [ ...EXPORTS_DECLARATIONS ],
})
export class AudioContextModule {}
