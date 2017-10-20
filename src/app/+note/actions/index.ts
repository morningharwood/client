import { Action } from '@ngrx/store';
import { Post } from '../models';


export const GET_POST = 'Post get';
export const GET_POST_SUCCESS = 'Post get success';

export class GetPost implements Action {
  readonly type = GET_POST;
  constructor(public payload:string){}
}

export class GetPostSuccess implements Action {
  readonly type = GET_POST_SUCCESS;
  constructor(public payload: Post){}
}


export type All
  = GetPost
  | GetPostSuccess;
