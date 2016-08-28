import { NEW_USER } from "../constants/constants"

const UsersReducer = (state = [], action) => {
  switch(action.type){
    case NEW_USER:
      let newState = state.map((user) => (
        Object.assign({}, user);
      ))
      newState.push(action.user);
      return newState;
  }

  return state;
}

export default UsersReducer