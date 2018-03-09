import { Injectable } from '@angular/core';
import { RouterStateSerializer } from '@ngrx/router-store';
import { Router, RouterStateSnapshot, Params } from '@angular/router';

import { Store } from '@ngrx/store';

import { State } from './reducers';
import * as GameActions from './actions/game';

@Injectable()
export class Utils {
  constructor(private store: Store<State>, private router: Router) { }

  /**
   * Remove current game from the store and navigate to the welcome page.
   */
  startClean(): void {
    this.store.dispatch(new GameActions.RemoveGame());
    this.router.navigateByUrl('/');
  }
}

export interface RouterStateUrl {
  url:         string;
  queryParams: Params;
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url }     = routerState;
    const queryParams = routerState.root.queryParams;
    return { url, queryParams };
  }
}
