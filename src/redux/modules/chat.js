import { FETCH_SUCCESS } from "redux/modules/game";
import { LOAD_SUCCESS } from "redux/modules/auth";

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_SUCCESS: {
      const { id, nickname } = action.result.data;
      const newState = {
        userId: id,
        author: nickname
      };
      return newState;
    }
    case FETCH_SUCCESS: {
      const game = action.payload;
      const newState = {
        ...state,
        gameId: game.id,
        recipient: state.userId === game.userId1 ? game.username2 : game.username1
      };

      return newState;
    }
    default:
      return state;
  }
};
