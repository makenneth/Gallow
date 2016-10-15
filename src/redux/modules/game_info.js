import { FETCH_SUCCESS, CLEAR_GAME } from "./game";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      let newState = {
        ...state,
        ...action.payload
      };

      return newState;
    case CLEAR_GAME:
      return {};
    default:
      return state;
  }
};
