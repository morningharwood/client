/**
 * https://en.wikipedia.org/wiki/Gnomon
 */
import * as gnomon from '../actions';

export interface State {
  timeSession: Date,
}
const initialState: State = {
  timeSession: new Date()
};

export function reducer(state = initialState,
                        action: gnomon.Actions) {
  console.log(action, 'action');
    switch(action.type) {
      default:
        return state;
    }
}
