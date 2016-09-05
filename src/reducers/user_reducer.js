import { LOGGED_IN, LOGGED_OUT } from "../constants/constants"

const UserReducer = (state = null, action) => {
  switch (action.Type){
    case LOGGED_IN:
      debugger;
      let user = action.payload.data;
      return user;
    case LOGGED_OUT:
      return null;
  }

  return state
}

export default UserReducer