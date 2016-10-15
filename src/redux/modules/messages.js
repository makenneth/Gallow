const NEW = "hangperson/messages/NEW";
const FETCHED = "hangperson/messages/FETCHED";

export default (state = [], action) => {
  let newState;
  switch (action.type) {
    case FETCHED:
      return action.payload;
    case NEW:
      newState = [...state, action.payload];
      return newState;
    default:
      return state;
  }
};

export const addNewMessage = (message) => {
  return {
    type: NEW,
    payload: message
  };
};

export const fetchedMessages = (messages) => {
  return {
    type: FETCHED,
    payload: messages
  };
};
