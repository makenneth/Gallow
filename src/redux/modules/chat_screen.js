const TOGGLE = "hangperson/chat-screen/TOGGLE";

export default (state = false, action) => {
  if (action.type === TOGGLE) {
    return !state;
  }

  return state;
};

export const toggleChat = () => {
  return {
    type: TOGGLE
  };
};
