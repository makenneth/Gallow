// import { CURRENT_USER } from "../constants/constants"
// const userReducer = (state = {username: null}, action) => {
//   switch (action.type){
//     case CURRENT_USER:
//       const newState = {username: action.currentUser};
//       return newState;
//   }

//   return state;
// }


// export default userReducer

import { LOGGED_IN, LOGGED_OUT } from "../constants/constants"

export default (state = null, action) => {
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