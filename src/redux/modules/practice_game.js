import GameSolver from 'helpers/game';
import { savePracticeGame } from './games';
export const CORRECT_GUESS = 'hangperson/game/CORRECT_GUESS';
export const INCORRECT_GUESS = 'hangperson/game/INCORRECT_GUESS';
export const GAME_ENDED = 'hangperson/game/GAME_ENDED';


export function makeGuess(guess, autoGenerate = false) {
  return (dispatch, getState) => {
    const { game, gameInfo } = getState();
    let madeGuess = autoGenerate ? GameSolver.generateGuess(game) : guess;
    let correct = false;
    let ended = false;
    const correctGuesses = game.correctGuesses.slice();
    for (const [i, ch] of game.word.split('').entries()) {
      if (ch === madeGuess) {
        correctGuesses[i] = madeGuess;
        correct = true;
      }
    }

    const winner = checkGameEnd(game, gameInfo, correctGuesses, correct);
    if (winner[0]) {
      dispatch(gameEnded(madeGuess, correctGuesses, ...winner));
    } else {
      const nextTurn = game.turn === gameInfo.userId1 ? gameInfo.userId2 : gameInfo.userId1;
      if (correct) {
        dispatch(correctGuess(madeGuess, correctGuesses, nextTurn));
      } else {
        dispatch(incorrectGuess(madeGuess, nextTurn));
      }
    }
  };
}

export function gameEnded(guess, correctGuesses, winner, wrongGuesses1, wrongGuesses2) {
  return {
    type: GAME_ENDED,
    payload: {
      winner,
      guess,
      correctGuesses,
      wrongGuesses1,
      wrongGuesses2,
    }
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

function checkGameEnd(game, gameInfo, correctGuesses, isCorrect) {
  let wrongGuesses1 = game.wrongGuesses1;
  let wrongGuesses2 = game.wrongGuesses2;
  let winner;
  if (correctGuesses.every(a => Boolean(a))) {
    winner = game.turn;
  } else {
    if (game.turn === gameInfo.userId1 && game.wrongGuesses1 >= 5 && !isCorrect) {
      winner = gameInfo.userId2;
      wrongGuesses1 = 6;
    } else if (game.turn === gameInfo.userId2 && game.wrongGuesses2 >= 5 && !isCorrect) {
      winner = gameInfo.userId1;
      wrongGuesses2 = 6;
    }
  }

  return [
    winner,
    wrongGuesses1,
    wrongGuesses2,
  ];
}
