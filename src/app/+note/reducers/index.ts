import * as PostActions from '../actions';
import { Post } from '../models';

export type Action = PostActions.All;


export function postReducer(state: Post, action: Action) {
  switch (action.type) {
    case PostActions.GET_POST:
      return { ...state, loading: true };
    case PostActions.GET_POST_SUCCESS:
      console.log(state, action);
      return { ...state, ...action.payload, loading: false };
    default:
      return state;
  }

}
