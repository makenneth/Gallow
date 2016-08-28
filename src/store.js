import { combineReducers, createStore } from "redux"
import messagesReducer from "./reducers/messages_reducer"
import userReducer from "./reducers/user_reducer"
import usersReducer from "./reducers/users_reducer"
const reducers = combineReducers({
  messages: messagesReducer,
  currentUser: userReducer,
  users: usersReducer
})

const store = createStore(reducers);

export default store