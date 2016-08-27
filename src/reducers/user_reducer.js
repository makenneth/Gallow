const userReducer = (state = {username: null}, action) => {
  switch (action.type){
    case "NEW_USER":
      const newState = {username: action.user};
      return newState;
  }

  return state;
}


export default userReducer