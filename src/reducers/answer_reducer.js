import { SET_ANSWER } from "../constants/constants"

export default (state = "", action) => {
  switch (action.type){
    case SET_ANSWER:
      return action.answer;
  }

  return state
}