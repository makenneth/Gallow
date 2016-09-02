import { combineReducers, createStore } from "redux"
import messagesReducer from "./reducers/messages_reducer"
import userReducer from "./reducers/user_reducer"
import usersReducer from "./reducers/users_reducer"
import guessReducer from "./reducers/guess_reducer"
import answerReducer from "./reducers/answer_reducer"

const reducers = combineReducers({
  messages: messagesReducer,
  currentUser: userReducer,
  users: usersReducer,
  guess: guessReducer,
  answer: answerReducer
})

const store = createStore(reducers);

export default store