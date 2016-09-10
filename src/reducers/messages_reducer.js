import { NEW_MESSAGE, FETCHED_MESSAGES } from "../constants/constants"

const copyState = (state) => {
  return state.map((msg) => (
    Object.assign({}, msg)
  ));
}

const messagesReducer = (state = [], action) => {
  let newState;
  switch (action.type) {
    case FETCHED_MESSAGES:
      debugger;
      return action.payload;
    case NEW_MESSAGE:
      debugger;
      newState = [...state, action.payload];
      return newState;
  }
  return state;
}

export default messagesReducer