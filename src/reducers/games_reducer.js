import { FETCHED_GAMES, CREATED_GAME } from "../constants/constants"

export default (state = {
  unfinished: [], 
  finished: []
}, action) => {
  switch (action.type){
    case FETCHED_GAMES:
      return action.payload.data;
    case CREATED_GAME:
      let newState = Object.assign({}, state)
      newState.finished = [...state.finished, action.payload.data]
      return newState;
  }

  return state;
}