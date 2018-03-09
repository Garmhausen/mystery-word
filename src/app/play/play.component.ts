import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { GameService } from '../game.service';
import { Game } from '../shared/utils';
import { State } from '../shared/reducers';
import * as GameActions from '../shared/actions/game';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit, OnDestroy {

  game:     Game;
  storeSub: any;

  // choosing not to use regex for the benefit of this example.
  alphabet = [
    'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p',
    'q', 'r', 's', 't',
    'u', 'v', 'w', 'x',
    'y', 'z'];

  public guessForm:  FormGroup;
  public guessInput: FormControl;

  guess        = '';
  guessIsValid = false;

  constructor(private store: Store<State>, private gameService: GameService, private router: Router) {
    this.guessForm = new FormGroup({
      guessInput: new FormControl(this.guess, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
        Validators.pattern(/^[A-Za-z]+$/)
      ]),
    });
    this.subscribeToGuessFormChanges();
  }

  ngOnInit() {
    this.storeSub = this.store.select('game')
      .subscribe(game => {
        this.game = game;
        if (!this.game.active) {
          this.determineOutcome();
        }
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  /**
   * Handle changes to the reactive form through subscription
   */
  subscribeToGuessFormChanges() {
    const guessStatusChanges$ = this.guessForm.statusChanges;
    const guessValueChanges$  = this.guessForm.valueChanges;

    guessStatusChanges$.subscribe(x => {
      if (x === 'VALID') {
        this.guessIsValid = true;
      } else {
        this.guessIsValid = false;
      }
    });

    guessValueChanges$.subscribe(x => {
      if (x.guessInput && x.guessInput.length > 0 && !this.isClean(x.guessInput)) {
        const str = this.cleanInput(x.guessInput);
        this.guessForm.reset({ guessInput: str });
      }
    });
  }

  /**
   * Submit user guesses to the GameService
   * @param guess a letter
   */
  submitGuess(guess: string): void {
    this.guessForm.reset();
    this.gameService.makeGuess(this.game, guess)
      .then((r: any) => {
        this.store.dispatch(new GameActions.UpdateGame(r));
      });
  }

  /**
   * Check to see if the game has been won or lost.
   */
  determineOutcome(): void {
    if (this.game.win) {
      this.router.navigateByUrl('/win');
    } else if (this.game.lose) {
      this.router.navigateByUrl('/lose');
    } else {
      this.router.navigateByUrl('/');
    }
  }

  /**
   * Determine if the input can be accepted.
   * @param str any single character
   */
  isClean(str: string): boolean {
    return this.alphabet.includes(str);
  }

  /**
   * Change any string to either the last letter typed
   * or to empty.
   * @param str any string
   */
  cleanInput(str: string): string {
    if (str.length > 1) {
      str = str.slice(str.length - 1);
    }
    str = str.toLowerCase();
    if (!this.alphabet.includes(str)) {
      str = '';
    }
    return str;
  }
}
