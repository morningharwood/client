import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';
import { CapitalizePipe } from '../../../_handies/pipes/capitalize';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
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
