/**
 * https://en.wikipedia.org/wiki/Gnomon
 */
import * as gnomon from '../actions';

export interface State {
  currentHour: number,
}

const initialState: State = {
  currentHour: new Date().getHours()
};

export function reducer(state = initialState,
                        action: gnomon.Actions) {
  console.log(action, 'action');
    switch(action.type) {
      case gnomon.MORNING:
        return  {
          ...state,
          currentHour: 6,
        };
      case gnomon.AFTERNOON:
        return  {
          ...state,
          currentHour: 12,
        };
      case gnomon.EVENING:
        return  {
          ...state,
          currentHour: 7,
        };
      default:
        return state;
    }
}
