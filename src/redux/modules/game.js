const UPDATE_SUCCESS = 'hangperson/game/UPDATE_SUCESS';
const LOAD_PRACTICE_GAME = 'hangperson/game/LOAD_PRACTICE_GAME';
const GAME_CONNECTED = 'hangperson/game/GAME_CONNECTED';
const PLAYER_CONNECTED = 'hangperson/game/PLAYER_CONNECTED';
const CLEAR_GAME = 'hangperson/game/CLEAR_GAME';
const SOLVE_GAME = 'hangperson/game/SOLVE_GAME';
const MAKE_MOVE = 'hangperson/game/MAKE_MOVE';
const FETCH_SUCCESS = 'hangperson/game/FETCH_SUCCESS';
const SOLVE_PRACTICE_GAME = 'hangperson/game/SOLVE_PRACTICE_GAME';
import { CORRECT_GUESS, INCORRECT_GUESS } from './practice_game';

export {
  GAME_CONNECTED,
  PLAYER_CONNECTED,
  CLEAR_GAME,
  SOLVE_GAME,
  MAKE_MOVE,
  FETCH_SUCCESS,
  LOAD_PRACTICE_GAME,
};

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_PRACTICE_GAME:
      return action.payload.state;
    case FETCH_SUCCESS:
      return action.payload.state;
    case UPDATE_SUCCESS:
      return action.payload;
    case CLEAR_GAME:
      return {};
    case SOLVE_PRACTICE_GAME:
      return {
        ...state,
        solving: true,
      };
    case CORRECT_GUESS:
      return {
        ...state,
        guess: action.payload.guess,
        turn: action.payload.newTurn,
        usedLetters: [...state.usedLetters, action.payload.guess],
        correctGuesses: action.payload.correctGuesses,
      };
    case INCORRECT_GUESS: {
      const newState = {
        guess: action.payload.guess,
        usedLetters: [...state.usedLetters, action.payload.guess],
        solving: false,
        turn: action.payload.newTurn,
      };

      if (state.turn === -1) {
        newState.wrongGuesses2 = state.wrongGuesses2 + 1;
      } else {
        newState.wrongGuesses1 = state.wrongGuesses1 + 1;
      }
      return Object.assign({}, state, newState);
    }
    default:
      return state;
  }
};

export const fetchedGameData = (game) => {
  return {
    type: FETCH_SUCCESS,
    payload: game,
  };
};

export const updatedGame = (game) => {
  return {
    type: UPDATE_SUCCESS,
    payload: game,
  };
};

export const clearGame = () => {
  return {
    type: CLEAR_GAME,
  };
};

const connectGame = (id) => {
  return {
    type: GAME_CONNECTED,
    payload: id,
  };
};

export const solveGame = () => {
  return (dispatch) => {
    if (!/practice/.test(this.props.location.pathname)) {
      dispatch(solveNormalGame());
    } else {
      dispatch(solvePracticeGame());
    }
  }
};

const solveNormalGame = () => {
  return {
    type: SOLVE_GAME,
  };
}

const solvePracticeGame = () => {
  return {
    type: SOLVE_PRACTICE_GAME,
  };
}

export const makeMove = (move) => {
  return {
    type: MAKE_MOVE,
    payload: move,
  };
};

export const connectUser = () => {
  return {
    type: PLAYER_CONNECTED,
  };
};

export const loadGame = (id) => {
  return (dispatch, getState) => {
    if (/practice/.test(window.location.pathname)) {
      const { practice } = getState().games;
      const game = practice.find(game => game.info.id === +id);
      if (game) {
        dispatch(startPracticeGame(game));
      } else {
        // alert error
      }
    } else {
      dispatch(connectGame(id));
    }
  }
};

const startPracticeGame = (game) => {
  return {
    type: LOAD_PRACTICE_GAME,
    payload: game,
  };
};
