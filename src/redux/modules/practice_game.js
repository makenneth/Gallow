import GameSolver from 'helpers/game';

export const CORRECT_GUESS = 'hangperson/game/CORRECT_GUESS';
export const INCORRECT_GUESS = 'hangperson/game/INCORRECT_GUESS';
export const GAME_WON = 'hangperson/game/GAME_WON';


export function makeGuess(guess, autoGenerate = false) {
  return (dispatch, getState) => {
    const { game } = getState();
    let madeGuess = autoGenerate ? GameSolver.generateGuess(game) : guess;
    let correct = true;
    let ended = false;
    const correctGuesses = game.correctGuesses.slice();
    for (const [i, ch] of game.word.split('').entries()) {
      if (ch === madeGuess) {
        correctGuesses[i] = madeGuess;
      } else {
        correct = false;
      }
    }

    if (correctGuesses.every(a => Boolean(a))) {
      dispatch(gameEnded(game.turn));
    }
    if (correct) {
      dispatch(correctGuess(madeGuess, correctGuesses));
    } else {
      dispatch(incorrectGuess(madeGuess));
    }
    dispatch(checkGameEnd());
  };
}

export function gameEnded(winner) {
  /* winner can be null -> drawn */
  return {
    type: GAME_ENDED,
    winner,
  };
}

export function correctGuess(guess, correctGuesses) {
  return {
    type: CORRECT_GUESS,
    payload: {
      guess,
      correctGuesses,
    },
  };
}

export function incorrectGuess(guess) {
  return {
    type: INCORRECT_GUESS,
    payload: {
      guess,
    }
  };
}

function checkGameEnd() {
  return (dispatch, getState) => {
    const { game } = getState();
    let winner;
    if (game.wrongGuesses1 >= 6) {
      winner = game.userId2;
    } else if (game.wrongGuesses2 >= 6) {
      winner = game.userId1;
    }

    if (winner) {
      dispatch(gameEnded(winner));
    }
  }
}
