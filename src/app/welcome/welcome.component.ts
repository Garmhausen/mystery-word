import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { GameService } from '../game.service';

import { State } from '../shared/reducers';
import * as GameActions from '../shared/actions/game';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  storeSub: any;
  game: any;

  constructor(private store: Store<State>, private gameService: GameService) { }

  ngOnInit() {
    this.storeSub = this.store.select('game').subscribe(game => {
      this.game = game;
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  startGame(difficulty) {
    this.gameService.getNewGame(difficulty).then((r: any) => {
        console.log('game =', r);
        this.store.dispatch(new GameActions.UpdateGame(r));
      }
    );
  }

}
