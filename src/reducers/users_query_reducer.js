import { FETCHED_USERS } from "../constants/constants"
export default (state = [], action) => {
  console.log(action)
  switch (action.type){
    case FETCHED_USERS:
      let users = action.payload.data
      return users;
  }

  return state
}