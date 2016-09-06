import { FETCHED_GAMES } from "../constants/constants"

export default (state = [], action) => {
  switch (action.type){
    case FETCHED_GAMES:
      return [];
      break;
  }

  return state
}