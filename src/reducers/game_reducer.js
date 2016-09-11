import { FETCHED_GAME, UPDATED_GAME } from "../constants/constants"

export default (state = {}, action) => {
  switch (action.type){
    case FETCHED_GAME:
      return action.payload.state
    case UPDATED_GAME:
      return action.payload
  }

  return state
}