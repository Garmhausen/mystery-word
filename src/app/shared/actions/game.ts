import { Action } from '@ngrx/store';

export const UPDATE_GAME = '[Game] Update Game';
export const REMOVE_GAME = '[Game] Remove Game';

export class UpdateGame implements Action {
  readonly type = UPDATE_GAME;

  constructor(public payload?: any) {}
}

export class RemoveGame implements Action {
  readonly type = REMOVE_GAME;

  constructor(public payload?: any) {}
}

export type Actions = UpdateGame | RemoveGame;
