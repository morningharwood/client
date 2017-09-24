import {
  RouterModule,
  Routes,
} from '@angular/router';
import { MenuContainer } from './containers/menu';
import { ModuleWithProviders } from '@angular/core';


export const routes: Routes = [
  {
    path: 'menu',
    component: MenuContainer,
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
