const userReducer = (state = {name: "Anonymous"}, action) => {
  switch (action.type){
    case "NEW_USER":
      newState = {name: action.payload.name};
      return newState;
  }

  return state;
}


export default userReducer