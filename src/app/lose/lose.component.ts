import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Game } from '../shared/utils';
import { State } from '../shared/reducers';

@Component({
  selector: 'app-lose',
  templateUrl: './lose.component.html',
  styleUrls: ['./lose.component.scss']
})
export class LoseComponent implements OnInit, OnDestroy {

  game:     Game;
  storeSub: any;

  constructor(
    private store:  Store<State>,
    private router: Router
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
