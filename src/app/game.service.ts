import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { of } from 'rxjs/observable/of';

import { environment } from './../environments/environment';

@Injectable()
export class GameService {
  game: any;
  api = environment.api;

  constructor(private http: HttpClient) { }

  getNewGame(difficulty) {
    let headers = new HttpHeaders;
    headers = headers.append('Content-Type', 'application/json');
    const url = this.api + 'new';
    const body = {
      difficulty: difficulty
    };
    return this.http.post(url, body, { headers }).toPromise();
  }

  makeGuess(game, guess) {
    let headers = new HttpHeaders;
    headers = headers.append('Content-Type', 'application/json');
    const url = this.api + 'play';
    const body = {
      game: game,
      guess: guess
    };
    return this.http.post(url, body, { headers }).toPromise();
  }
}
