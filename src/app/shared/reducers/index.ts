import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { RouterStateUrl } from '../utils';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

// import other reducers here.

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  // game: fromGame.State;
  // any other state-stored object types here.
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
  // game: fromGame.reducer,
  // other reducers listed here.
};

// logging all actions, for science
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger, storeFreeze] : [];

// export const getGameState = createFeatureSelector<fromGame.State>('company');
// export const getGame = createSelector(
//   getGameState,
//   fromGame.getGame
// );
