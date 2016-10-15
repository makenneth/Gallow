const FETCHED_GAME = "hangperson/chat/FETCHED_GAME";
const LOGGED_IN = "hangperson/chat/LOGGED_IN";

export default (state = {}, action) => {
  switch (action.type) {
    case LOGGED_IN:
      const { id, nickname } = action.payload.data;
      let newState = {
        userId: id,
        author: nickname
      };
      return newState;
    case FETCHED_GAME:
      const game = action.payload;
      newState = {
        ...state,
        gameId: game.id,
        recipient: state.userId === game.userId1 ? game.username2 : game.username1
      };

      return newState;
    default:
      return state;
  }
};
