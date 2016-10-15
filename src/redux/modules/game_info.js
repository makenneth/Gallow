import { FETCH_SUCCESS, CLEAR_GAME } from "./game";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case CLEAR_GAME:
      return {};
    default:
      return state;
  }
};
