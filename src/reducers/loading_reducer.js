import { STARTED_LOADING, STOPPED_LOADING } from "../constants/constants"


export default (state = true, action) => {
  switch (action.type){
    case STARTED_LOADING:
      return true;
    case STOPPED_LOADING:
      return false
  }

  return state
}