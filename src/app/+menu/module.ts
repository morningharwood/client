import { NgModule } from '@angular/core';

import { MenuContainer } from './containers/menu';
import { routing } from './routes';

import { RunningHeadModule } from './components/running-head/running-head.module';
import { FolioModule } from './components/folio/folio.module';
import { CommonModule } from '@angular/common';
import { MenuNavigationModule } from './components/navigation/navigation.module';
import { BonerModule } from './components/boner/boner.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    routing,
    FolioModule,
    RunningHeadModule,
    MenuNavigationModule,
    BonerModule,
  ],
  exports: [ MenuContainer ],
  declarations: [ MenuContainer ],
  providers: [],
})
export class MenuModule {
}
