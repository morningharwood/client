import { Action } from '@ngrx/store';


export const DAYTIME = '[GNOMON] daytime';


export class Daytime implements Action {
  readonly type = DAYTIME;
}


export type Actions =
  | Daytime
