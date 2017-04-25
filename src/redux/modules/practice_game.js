import GameSolver from 'helpers/game';

export const CORRECT_GUESS = 'hangperson/game/CORRECT_GUESS';
export const INCORRECT_GUESS = 'hangperson/game/INCORRECT_GUESS';
export const GAME_ENDED = 'hangperson/game/GAME_ENDED';


export function makeGuess(guess, autoGenerate = false) {
  return (dispatch, getState) => {
    const { game, gameInfo } = getState();
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

    const nextTurn = game.turn === gameInfo.userId1 ? gameInfo.userId2 : gameInfo.userId1;
    if (correct) {
      dispatch(correctGuess(madeGuess, correctGuesses, nextTurn));
    } else {
      dispatch(incorrectGuess(madeGuess, nextTurn));
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

export function correctGuess(guess, correctGuesses, nextTurn) {
  return {
    type: CORRECT_GUESS,
    payload: {
      guess,
      correctGuesses,
      nextTurn,
    },
  };
}

export function incorrectGuess(guess, nextTurn) {
  return {
    type: INCORRECT_GUESS,
    payload: {
      guess,
      nextTurn,
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
