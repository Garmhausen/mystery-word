import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from './../environments/environment';
import { Game } from './shared/utils';

@Injectable()
export class GameService {

  api = environment.api;

  constructor(private http: HttpClient) { }

  // Http requests returned as Promises.

  getNewGame(difficulty: string): Promise<any> {
    let headers = new HttpHeaders;
    headers = headers.append('Content-Type', 'application/json');
    const url = this.api + 'new';
    const body = {
      difficulty: difficulty
    };
    return this.http.post(url, body, { headers }).toPromise();
  }

  makeGuess(game: Game, guess: string): Promise<any> {
    let headers = new HttpHeaders;
    headers = headers.append('Content-Type', 'application/json');
    const url = this.api + 'play';
    const body = {
      game:  game,
      guess: guess
    };
    return this.http.post(url, body, { headers }).toPromise();
  }

  submitWin(game: Game, name: string): Promise<any> {
    let headers = new HttpHeaders;
    headers = headers.append('Content-Type', 'application/json');
    const url = this.api + 'win';
    const body = {
      game: game,
      name: name
    };
    return this.http.post(url, body, { headers }).toPromise();
  }

  getWinners(): Promise<any> {
    let headers = new HttpHeaders;
    headers = headers.append('Content-Type', 'application/json');
    const url = this.api + 'winners';
    return this.http.get(url, { headers }).toPromise();
  }
}
