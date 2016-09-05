import { combineReducers, createStore, applyMiddleware } from "redux"
import messagesReducer from "./reducers/messages_reducer"
import userReducer from "./reducers/user_reducer"
import usersReducer from "./reducers/users_reducer"
import guessReducer from "./reducers/guess_reducer"
import answerReducer from "./reducers/answer_reducer"
import ReduxPromise from "redux-promise"

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


const reducers = combineReducers({
  messages: messagesReducer,
  user: userReducer,
  // users: usersReducer,
  guess: guessReducer,
  answer: answerReducer
})

const store = createStoreWithMiddleware(reducers);

export default store