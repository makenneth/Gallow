import { NEW_MESSAGE, NEW_USER } from "../constants/constants"

const copyState = (state) => {
  return state.map((msg) => (
    Object.assign({}, msg)
  ));
}

const messagesReducer = (state = [], action) => {
  let newState;
  switch (action.type) {
    case NEW_MESSAGE:
      newState = copyState(state);
      newState.push(action.message);
      return newState;
      break;
    case NEW_USER:
      newState = copyState(state);
      newState.push({author: "___newMessage*__", body: `${action.user} has joined the chat.`})
      return newState;
  }
  return state;
}

export default messagesReducer