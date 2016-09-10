import { LOGGED_IN, LOGGED_OUT } from "../constants/constants"

const UserReducer = (state = {}, action) => {
  switch (action.type){
    case LOGGED_IN:
      let user = action.payload.data;
      return user;
    case LOGGED_OUT:
      return {};
  }

  return state
}

export default UserReducer