import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuModule } from './+menu/module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { SundialModule } from './components/sundial/module';


/**
 * TODO(mharwood) https://intellij-support.jetbrains.com/hc/en-us/community/posts/115000158164-Angular-CLI-with-paths-in-tsconfig https://github.com/antonkarsten/sample/blob/master/src/tsconfig.app.json#L8 https://github.com/antonkarsten/sample/blob/master/src/app/app.module.ts#L8
 * TODO(mharwood) im pretty sure ive seen better writeups than that, but it is aliasing paths in angular cli
 */
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MenuModule,
    SundialModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
