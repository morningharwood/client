import { Injectable } from '@angular/core';
import {
  Effect,
  Actions,
} from '@ngrx/effects';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

import * as postActions from '../actions';
import { Post } from '../models';


export type Action = postActions.All;

@Injectable()
export class PostEffect {


  constructor(private actions: Actions, private db: AngularFirestore) {

  }

  @Effect()
  getPost: Observable<Action> = this.actions.ofType(postActions.GET_POST)
                                    .map((action: postActions.GetPost) => action.payload)
                                    .delay(2000) // just for testing
                                    .mergeMap(path => this.db.collection<any>(path).snapshotChanges() )
                                    .map(actions => {
                                      console.log(actions);
                                      return new postActions.GetPostSuccess({
                                        title: 'wtf',
                                        description: 'wtf',
                                        published: false,
                                      })
                                    });
}
