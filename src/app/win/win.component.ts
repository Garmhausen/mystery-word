import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { GameService } from '../game.service';
import { Utils, Game } from '../shared/utils';
import { State } from '../shared/reducers';
import * as GameActions from '../shared/actions/game';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.scss']
})
export class WinComponent implements OnInit, OnDestroy {

  storeSub: any;
  game:     Game;

  public nameForm:  FormGroup;
  public nameInput: FormControl;

  name        = '';
  nameIsValid = false;

  constructor(
    private store:       Store<State>,
    private gameService: GameService,
    private router:      Router,
    public  utils:       Utils
  ) {
    this.nameForm = new FormGroup({
      nameInput: new FormControl(this.name, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
        Validators.pattern(/^[A-Za-z]+$/)
      ]),
    });
    this.subscribeToNameFormChanges();
  }

  ngOnInit() {
    this.storeSub = this.store.select('game').subscribe(game => {
      this.game = game;
      if (this.game.active) {
        this.router.navigateByUrl('/play');
      } else if (this.game.lose) {
        this.router.navigateByUrl('/lose');
      } else if (!this.game.win) {
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  /**
   * Handle changes to the reactive form through subscriptions.
   */
  subscribeToNameFormChanges() {
    const nameValueChanges$  = this.nameForm.valueChanges;
    const nameStatusChanges$ = this.nameForm.statusChanges;

    nameValueChanges$.subscribe(x => {
      this.name = x.nameInput;
    });

    nameStatusChanges$.subscribe(x => {
      if (x === 'VALID') {
        this.nameIsValid = true;
      } else {
        this.nameIsValid = false;
      }
    });
  }

  /**
   * Submit user's name to register in winners table.
   * @param name user's entered name
   */
  submitName(name: string): void {
    if (this.nameIsValid) {
      this.gameService.submitWin(this.game, name).then((r: any) => {
        this.router.navigateByUrl('/winners');
      });
    }
  }
}
