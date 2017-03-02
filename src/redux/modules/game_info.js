import { FETCH_SUCCESS, CLEAR_GAME } from './game';

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
    case CLEAR_GAME:
      return {};
    default:
      return state;
  }
};
