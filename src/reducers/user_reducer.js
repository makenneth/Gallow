import { CURRENT_USER } from "../constants/constants"
const userReducer = (state = {username: null}, action) => {
  switch (action.type){
    case CURRENT_USER:
      const newState = {username: action.user};
      return newState;
  }

  return state;
}


export default userReducer