import { FETCHED_GAMES, CREATED_GAME } from "../constants/constants"

export default (state = [], action) => {
  switch (action.type){
    case FETCHED_GAMES:
      return action.payload.data;
      
    case CREATED_GAME:
      //this should be a whole game object
      let newState = [...state, action.payload.data]
      return newState;
  }

  return state
}