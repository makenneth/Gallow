import { FETCHED_GAMES, FETCHED_GAME, CREATED_GAME } from "../constants/constants"

export default (state = {
  unfinished: [], 
  finished: []
}, action) => {
  switch (action.type){
    case FETCHED_GAMES:
      return action.payload.data;
    case FETCHED_GAME:
      // let newState = Object.assign({}, state),
      //     payload = action.payload,
      //     receivedObj = {
      //       id: payload.id,
      //       finished: payload.finished,
      //       nickname1: payload.nickname1,
      //       nickname2: payload.nickname2
      //     }
      // if (action.payload.finished){
      //   payload.finished = [...state.finished, receivedObj]
      // } else {
      //   payload.unfinished = [...state.unfinished, receivedObj]
      // }
      // return newState;
      return state;
    case CREATED_GAME:
      let newState = Object.assign({}, state)
      newState.finished = [...state.finished, action.payload.data]
      return newState;
  }

  return state;
}