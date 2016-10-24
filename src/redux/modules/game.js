const UPDATE_SUCCESS = "hangperson/game/UPDATE_SUCESS";
export const GAME_CONNECTED = "hangperson/game/GAME_CONNECTED";
export const PLAYER_CONNECTED = "hangperson/game/PLAYER_CONNECTED";
export const CLEAR_GAME = "hangperson/game/CLEAR_GAME";
export const SOLVE_GAME = "hangperson/game/SOLVE_GAME";
export const MAKE_MOVE = "hangperson/game/MAKE_MOVE";
export const FETCH_SUCCESS = "hangperson/game/FETCH_SUCCESS";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return action.payload.state;
    case UPDATE_SUCCESS:
      return action.payload;
    case CLEAR_GAME:
      return {};
    default:
      return state;
  }
};

export const fetchedGameData = (game) => {
  return {
    type: FETCH_SUCCESS,
    payload: game
  };
};

export const updatedGame = (game) => {
  return {
    type: UPDATE_SUCCESS,
    payload: game
  };
};

export const clearGame = () => {
  return {
    type: CLEAR_GAME
  };
};

export const connectGame = (id) => {
  return {
    type: GAME_CONNECTED,
    payload: id
  };
};

export const solveGame = () => {
  return {
    type: SOLVE_GAME
  };
};

export const makeMove = (move) => {
  return {
    type: MAKE_MOVE,
    payload: move
  };
};

export const connectUser = () => {
  return {
    type: PLAYER_CONNECTED
  };
};
