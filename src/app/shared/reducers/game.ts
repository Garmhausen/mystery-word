import * as gameActions from '../actions/game';

export interface State {
  active:             boolean;
  word?:              string;
  difficulty?:        string;
  wordArray?:         any[];
  badGuessArray?:     string[];
  hiddenLetterCount?: number;
  remainingGuesses?:  number;
  totalGuesses?:      number;
  win?:               boolean;
  lose?:              boolean;
  dictionary?:        string;
}

const initialState: State = {
  active: false
};

export function reducer(state = initialState, action: gameActions.Actions): State {

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

export const getGame = (state: State) => state;
