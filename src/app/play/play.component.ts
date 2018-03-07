import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  guess = '';
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
    this.storeSub = this.store.select('game').subscribe(game => {
      this.game = game;
      if (!this.game.active) {
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

  submitGuess(guess): void {
    console.log('make guess for', guess);
    this.guessForm.reset();
    this.gameService.makeGuess(this.game, guess).then(   (r: any) => {
        this.store.dispatch(new GameActions.UpdateGame(r));
      });
  }

  determineOutcome(): void {
    if (this.game.win) {
      this.router.navigateByUrl('/win');
    } else if (this.game.lose) {
      this.router.navigateByUrl('/lose');
    } else {
      this.router.navigateByUrl('/');
    }
  }

  isClean(str: string): boolean {
    return this.alphabet.includes(str);
  }

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
