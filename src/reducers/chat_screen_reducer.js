import {  TOGGLE_CHAT  } from "../constants/constants"

export default (state = false, action) => {
  if (action.type === TOGGLE_CHAT){
    return !state
  }

  return state
}