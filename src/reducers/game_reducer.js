import { SET_GAME, UPDATED_GAME } from "../constants/constants"

export default (state = null, action) => {
  switch (action.type){
    case SET_GAME:
      return action.payload
    case UPDATED_GAME:
      return action.payload
  }

  return state
}