const FETCH_SUCCESS = "hangperson/game/FETCH_SUCCESS";
const UPDATE_SUCCESS = "hangperson/game/UPDATE_SUCESS";
const CLEAR_GAME = "hangperson/game/CLEAR_GAME";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return action.payload.state;
    case UPDATE_SUCESS:
      return action.payload;
    case CLEAR_GAME:
      return {};
    default:
      return state;
  }

  return state;
};

export const fetchedGameData = (game) => {
  return {
    type: FETCH_SUCCESS,
    payload: game
  };
};

export const updatedGame = (game) => {
  return {
    type: UPDATE_SUCESS,
    payload: game
  };
};

export const clearGame = () => {
  return {
    type: CLEAR_GAME
  };
};
