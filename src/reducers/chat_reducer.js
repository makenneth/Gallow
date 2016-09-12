import { FETCHED_GAME, LOGGED_IN } from "../constants/constants"

export default (state = {}, action) => {

  switch (action.type){
    case LOGGED_IN:
      let { id, nickname } = action.payload.data,
          newState = {};
      newState.userId = id;
      newState.author = nickname;

      return newState;
    case FETCHED_GAME:
      let game = action.payload;
      newState = Object.assign({}, state);
      newState.gameId = game.id;
      newState.recipient = newState.userId === game.userId1 ? game.username2 : game.username1
      return newState;
  }

  return state
}