import { NEW_MESSAGE, FETCHED_MESSAGES } from "../constants/constants"

const messagesReducer = (state = [], action) => {
  let newState;
  switch (action.type) {
    case FETCHED_MESSAGES:
      return action.payload;
    case NEW_MESSAGE:
      newState = [...state, action.payload];
      return newState;
  }
  return state;
}

export default messagesReducer