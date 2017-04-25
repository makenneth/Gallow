import { FETCH_SUCCESS, CLEAR_GAME, LOAD_PRACTICE_GAME } from './game';
import { CREATE_PRACTICE_GAME } from './games';
import { GAME_ENDED } from './practice_game';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SUCCESS: {
      const newState = {
        ...state,
        ...action.payload,
      };
      delete newState.state;
      return newState;
    }
    case GAME_ENDED: {
      const winner = action.payload.winner;
      return {
        ...state,
        finished: true,
        winner,
      };
    }
    case LOAD_PRACTICE_GAME:
      return action.payload.info;
    case CLEAR_GAME:
      return {};
    default:
      return state;
  }
};
