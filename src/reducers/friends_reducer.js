import { ADDED_FRIEND, FETCHED_FRIENDS } from "../constants/constants"

export default (state = [], action) => {
  switch (action.type){
    case ADDED_FRIEND:
      return [...state, action.payload.data]
    case FETCHED_FRIENDS:
      return action.payload.data;
  }

  return state;
}