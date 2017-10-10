/**
 * Created by matth on 2/19/2017.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonerComponent } from './boner.component';
import { MatchMediaService } from '../../../_handies/window/match-media';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AspectRatioService } from '../../../_handies/window/aspect-ratio';


@NgModule({
  imports: [CommonModule, FlexLayoutModule],
  declarations: [BonerComponent],
  exports: [BonerComponent],
  providers: [MatchMediaService, AspectRatioService]
})
export class BonerModule {
}
