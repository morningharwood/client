import {
  RouterModule,
  Routes,
} from '@angular/router';
import { NoteContainer } from './containers/note';
import { ModuleWithProviders } from '@angular/core';


export const routes: Routes = [
  {
    path: 'note',
    component: NoteContainer,
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
