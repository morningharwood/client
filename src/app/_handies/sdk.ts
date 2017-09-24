/**
 * Created by matth on 2/23/2017.
 */
import { Action } from "@ngrx/store";
import { PartsOfDay, PartsOfDayEnum } from "./date";
export const ACTIVATE = 'ACTIVATE';
export const DEACTIVATE = 'DEACTIVATE';

export function keyboardReducer(state: boolean = false, action: Action) {

  switch (action.type) {
    case ACTIVATE:
      return true;
    case DEACTIVATE:
      return false;
    default:
      return state;
  }
}
// case 'Morning':
// return {'sepia-filter': true};
// case 'Afternoon':
// return {'light-filter': true};
// case 'Evening':
// return {'dark-filter': true};
// default:
// return {'light-filter': true};

let initSunDialState = {
  selectedLabel: PartsOfDayEnum.Morning,
  options: (<any>Object).values(PartsOfDayEnum),
  filterClass:  {'sepia-filter': true},
};

export function sunDialReducer(state: any = '', action: Action) {
  switch (action.type) {
    case PartsOfDayEnum.Morning:
      return {
        selectedLabel: PartsOfDayEnum.Morning,
        options: (<any>Object).values(PartsOfDayEnum),
        filterClass:  {'sepia-filter': true},
      };

    case PartsOfDayEnum.Afternoon:
      return {
        selectedLabel: PartsOfDayEnum.Afternoon,
        options: (<any>Object).values(PartsOfDayEnum),
        filterClass:  {'light-filter': true},
      };

    case PartsOfDayEnum.Evening:
      return {
        selectedLabel: PartsOfDayEnum.Evening,
        options: (<any>Object).values(PartsOfDayEnum),
        filterClass:  {'dark-filter': true},
      };

    default:
      return state;
  }
}
