import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';
import { CapitalizePipe } from '../../../_handies/pipes/capitalize';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AudioContextModule } from '../audio-context/module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    AudioContextModule
  ],
  declarations: [
    ItemComponent,
    NavigationComponent,
    CapitalizePipe,
  ],
  exports: [ NavigationComponent ],
})
export class MenuNavigationModule {
}
