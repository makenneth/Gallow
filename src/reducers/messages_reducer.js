const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_MESSAGE":
      var newState = state.map((msg) => (
        Object.assign({}, msg);
      ));

      newState.push(action.payload.msg);
      return newState;
      break;
  }
  return [
    {
      author: "Rob",
      body: "Hi, I'm new here."
    } 
  ];
}

export default messageReducer