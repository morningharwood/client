import { NgModule } from '@angular/core';

import { MenuContainer } from './containers/menu';
import { routing } from './routes';

import { RunningHeadModule } from './components/running-head/running-head.module';
import { FolioModule } from './components/folio/folio.module';
import { CommonModule } from '@angular/common';
import { MenuNavigationModule } from './components/navigation/navigation.module';
import { BonerModule } from './components/boner/boner.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatchMediaService } from '../_handies/window/match-media';
import { BonerGlModule } from './components/boner-gl/module';
import { SundialModule } from '../components/sundial/module';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    routing,
    FolioModule,
    RunningHeadModule,
    MenuNavigationModule,
    BonerGlModule,
    BonerModule,
    SundialModule
  ],
  exports: [ MenuContainer ],
  declarations: [ MenuContainer ],
  providers: [ MatchMediaService ],
})
export class MenuModule {
}
