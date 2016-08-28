import { NEW_USER, REMOVE_USER } from "../constants/constants"

const UsersReducer = (state = [], action) => {
  let newState;
  switch(action.type){
    case NEW_USER:

      newState = [...state, action.user];
      return newState;
    case REMOVE_USER:
      newState = [];

      for (let i = 0; i < state; i++){
        if (state[i] !== action.user){
          newState.push(state[i])
        }
      }

      return newState
  }

  return state;
}

export default UsersReducer