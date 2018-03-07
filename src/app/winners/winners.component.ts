import { Component, OnInit } from '@angular/core';

import { GameService } from '../game.service';
import { Utils } from '../shared/utils';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {
  winners: any[] = [];

  constructor(public utils: Utils, private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getWinners().then((r: any) => {
      this.winners = r;
    });
  }
}
