import * as gameActions from '../actions/game';
import { Game } from '../utils';

const initialState: Game = {
  active: false
};

export function reducer(state = initialState, action: gameActions.Actions): Game {

  switch (action.type) {
    case gameActions.UPDATE_GAME:
      const game = action.payload;
      let active = false;
      if (!action.payload.win && !action.payload.lose) {
        active = true;
      } else {
        active = false;
      }
      return Object.assign({}, state, {
        active:            active,
        word:              game.word,
        difficulty:        game.difficulty,
        wordArray:         game.wordArray,
        badGuessArray:     game.badGuessArray,
        hiddenLetterCount: game.hiddenLetterCount,
        remainingGuesses:  game.remainingGuesses,
        totalGuesses:      game.totalGuesses,
        win:               game.win,
        lose:              game.lose,
        dictionary:        game.dictionary
      });

    case gameActions.REMOVE_GAME:
      return Object.assign({}, state);

    default:
      return state;
  }
}

export const getGame = (state: Game) => state;
