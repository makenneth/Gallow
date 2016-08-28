import { NEW_USER, REMOVE_USER, SET_USERS } from "../constants/constants"

const UsersReducer = (state = [], action) => {
  let newState;
  switch(action.type){
    case SET_USERS:
      return action.users;
    case NEW_USER:

      newState = [...state, action.user];
      return newState;
    case REMOVE_USER:
      newState = [];

      for (let i = 0; i < state.length; i++){
        if (state[i] !== action.user){
          newState.push(state[i])
        }
      }

      return newState
  }

  return state;
}

export default UsersReducer