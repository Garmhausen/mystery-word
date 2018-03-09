import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { of } from 'rxjs/observable/of';
import { environment } from './../environments/environment';

@Injectable()
export class GameService {

  game: any;

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

  makeGuess(game: any, guess: string): Promise<any> {
    let headers = new HttpHeaders;
    headers = headers.append('Content-Type', 'application/json');
    const url = this.api + 'play';
    const body = {
      game:  game,
      guess: guess
    };
    return this.http.post(url, body, { headers }).toPromise();
  }

  submitWin(game: any, name: string): Promise<any> {
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
