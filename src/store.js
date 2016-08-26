import { combinedReducers, createStore } from "redux"
import messagesReducer from "./reducers/messages_reducer"

const reducers = combinReducers({
  messages: messagesReducer
})

const store = createStore(reducers);

export default store