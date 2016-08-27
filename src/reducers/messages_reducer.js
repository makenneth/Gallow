import { NEW_MESSAGE } from "../constants/constants"

const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      var newState = state.map((msg) => (
        Object.assign({}, msg)
      ));

      newState.push(action.payload.msg);
      return newState;
      break;
  }
  return state;
}

export default messagesReducer