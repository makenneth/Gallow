const FETCHED_GAME = "hangperson/chat/FETCHED_GAME";
const LOGGED_IN = "hangperson/chat/LOGGED_IN";

export default (state = {}, action) => {
  switch (action.type) {
    case LOGGED_IN:
      let { id, nickname } = action.payload.data,
          newState = { userId: id, author: nickname };
      return newState;
    case FETCHED_GAME:
      let game = action.payload;
      newState = Object.assign({}, state);
      newState.gameId = game.id;
      newState.recipient = newState.userId === game.userId1 ? game.username2 : game.username1
      return newState;
    default:
      return state;
  }
};
