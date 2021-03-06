import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { GameService } from '../game.service';
import { LoadingService } from '../loading.service';
import { Game } from '../shared/utils';
import { State } from '../shared/reducers';
import * as GameActions from '../shared/actions/game';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  game:     Game;
  storeSub: any;

  constructor(
    private store:          Store<State>,
    private router:         Router,
    private gameService:    GameService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit() {
    this.storeSub = this.store.select('game').subscribe(game => {
      this.game = game;
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  /**
   * Set up a new game based on user choice of difficulty.
   * @param difficulty either 'Easy', 'Normal', or 'Hard'
   */
  startGame(difficulty: string) {
    this.loadingService.display(true);
    this.gameService.getNewGame(difficulty).then((r: any) => {
        this.store.dispatch(new GameActions.UpdateGame(r));
        this.loadingService.display(false);
        this.router.navigateByUrl('/play');
      });
  }

}
