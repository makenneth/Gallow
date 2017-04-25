import { FETCH_SUCCESS, CLEAR_GAME } from './game';
import { CREATE_PRACTICE_GAME } from './games';

/*
  newGameInfo => ({
    id,
    userId,
    username,
    nickname,
    finished,
    winner,
  })
*/

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
    case GAME_WON: {
      const winner = action.payload.turn === -1 ? state.nickname2 : state.nickname1;
      return {
        ...state,
        finished: true,
        winner,
      };
    }
    case LOAD_PRACTICE_GAME:
      return action.payload.info
    case CLEAR_GAME:
      return {};
    default:
      return state;
  }
};
