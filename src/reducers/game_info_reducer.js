import { FETCHED_GAME } from "../constants/constants"

export default (state = {}, action) => {

  switch (action.type){
    case FETCHED_GAME:
      let newState = {
        id: action.payload.id,
        userId1: action.payload.userId1,
        userId2: action.payload.userId2,
        username1: action.payload.username1,
        username2: action.payload.username2
      };

      return newState;
  }

  return state;
}