import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';

import { GameService } from '../game.service';

import { State } from '../shared/reducers';
import * as GameActions from '../shared/actions/game';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit, OnDestroy {

  storeSub: any;
  game:     any;

  public guessForm:   FormGroup;
  public guessInput:  FormControl;
  // public guessSubmit: FormControl;
  public events:      any[] = [];

  constructor(private store: Store<State>, private gameService: GameService, private router: Router) {
    this.guessForm = new FormGroup({
      guessInput: new FormControl(),
      // guessSubmit: new FormControl()
    });
    this.subscribeToGuessFormChanges();
  }

  ngOnInit() {
    this.storeSub = this.store.select('game').subscribe(game => {
      this.game = game;
      if (!this.game.active) {
        // game is over. (or possibly hasn't begun)
        this.determineOutcome();
      }
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  subscribeToGuessFormChanges() {
    const guessStatusChanges$ = this.guessForm.statusChanges;
    const guessValueChanges$  = this.guessForm.valueChanges;

    guessStatusChanges$.subscribe(x => {
      this.events.push({ event: 'STATUS_CHANGED', object: x }); // for future validation.
    });

    guessValueChanges$.subscribe(x => {
      this.events.push({ event: 'VALUE_CHANGED', object: x }); // for debugging
      console.log('x =', x);
      if (x.guessInput && x.guessInput.length > 1) {
        this.guessForm.reset({ guessInput: x.guessInput.slice(x.guessInput.length - 1) });
      }
    });
  }

  submitGuess(guess) {
    console.log('make guess for', guess);
    this.guessForm.reset();
    this.gameService.makeGuess(this.game, guess).then(   (r: any) => {
        this.store.dispatch(new GameActions.UpdateGame(r));
      });
  }

  determineOutcome() {
    if (this.game.win) {
      console.log('user has won!');
      // redirect to /win
      this.router.navigateByUrl('/win');
    } else if (this.game.lose) {
      console.log('user has lost!');
      // redirect to /lose
      this.router.navigateByUrl('/lose');
    } else {
      console.log('new game, difficulty has not been selected.  redirecting to /');
      // redirect to /
      this.router.navigateByUrl('/');
    }
  }

}
