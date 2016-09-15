import { FETCHED_GAMES, CREATED_GAME, OTHER_CREATED_GAME } from "../constants/constants"

export default (state = {
  unfinished: [], 
  finished: []
}, action) => {
  switch (action.type){
    case FETCHED_GAMES:
      return action.payload.data;
    case CREATED_GAME:
      var newState = Object.assign({}, state)
      newState.unfinished = [...state.unfinished, action.payload.data]
      return newState;
    case OTHER_CREATED_GAME:
      var newState = Object.assign({}, state)
      newState.unfinished = [...state.unfinished, action.payload]
      return newState;
  }

  return state;
}