import { FETCHED_GAME, CLEAR_GAME } from "../constants/constants"

export default (state = {}, action) => {

  switch (action.type){
    case FETCHED_GAME:
      let newState = {
        id: action.payload.id,
        userId1: action.payload.userId1,
        userId2: action.payload.userId2,
        username1: action.payload.username1,
        username2: action.payload.username2,
        nickname1: action.payload.nickname1,
        nickname2: action.payload.nickname2,
        finished: action.payload.finished,
        winner: action.payload.winner
      };

      return newState;
    case CLEAR_GAME:
      return {};
  }

  return state;
}