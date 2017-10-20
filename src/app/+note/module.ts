import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routing as notesRoute } from './routes';
import { NoteContainer } from './containers/note';
import { FireStoreModule } from '../services/firestore/module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './reducers/index';
import { PostEffect } from './effects/index';
import { EffectsModule } from '@ngrx/effects';

const DECLARATIONS_EXPORTS = [
  NoteContainer
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    notesRoute,
    FireStoreModule,
    EffectsModule.forFeature([PostEffect]),
    StoreModule.forFeature('notes', {
      post: postReducer
    })
  ],
  declarations: [
    ...DECLARATIONS_EXPORTS,
  ],
  exports: [
    ...DECLARATIONS_EXPORTS,
  ]
})
export class NoteModule {

}
