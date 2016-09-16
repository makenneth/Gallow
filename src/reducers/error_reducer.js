import { CLEAR_ERROR, SET_ERROR } from "../constants/constants"

export default (state = {
  message: null
}, action) => {
  switch(action.type){
    case CLEAR_ERROR:
      return { message: null };
    case SET_ERROR:
      return { message: action.payload };
  }

  return state;
}