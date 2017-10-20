import { Action } from '@ngrx/store';


export const MORNING = '[GNOMON] morning';
export const AFTERNOON = '[GNOMON] afternoon';
export const EVENING = '[GNOMON] evening';


export class Morning implements Action {
  readonly type = MORNING;
}

export class Afternoon implements Action {
  readonly type = AFTERNOON;
}

export class Evening implements Action {
  readonly type = EVENING;
}

export type Actions =
  | Morning
  | Afternoon
  | Evening
