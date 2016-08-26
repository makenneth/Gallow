import { combinedReducers, createStore } from "redux"
import messagesReducer from "./reducers/messages_reducer"
import userReducer from "./reducers/user_reducer"

const reducers = combineReducers({
  messages: messagesReducer,
  user: userReducer
})

const store = createStore(reducers);

export default store