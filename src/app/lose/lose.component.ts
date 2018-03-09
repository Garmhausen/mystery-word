import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Utils, Game } from '../shared/utils';
import { State } from '../shared/reducers';
import * as GameActions from '../shared/actions/game';

@Component({
  selector: 'app-lose',
  templateUrl: './lose.component.html',
  styleUrls: ['./lose.component.scss']
})
export class LoseComponent implements OnInit, OnDestroy {

  storeSub: any;
  game:     Game;

  constructor(
    private store:  Store<State>,
    private router: Router,
    public  utils:  Utils
  ) { }

  ngOnInit() {
    this.storeSub = this.store.select('game').subscribe(game => {
      this.game = game;
      if (this.game.active) {
        this.router.navigateByUrl('/play');
      } else if (this.game.win) {
        this.router.navigateByUrl('/win');
      } else if (!this.game.lose) {
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
