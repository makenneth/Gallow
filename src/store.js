import { combineReducers, createStore, applyMiddleware } from "redux"
import messagesReducer from "./reducers/messages_reducer"
import userReducer from "./reducers/user_reducer"
import usersQueryReducer from "./reducers/users_query_reducer"
import gamesReducer from "./reducers/games_reducer"
import ReduxPromise from "redux-promise"

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


const reducers = combineReducers({
  messages: messagesReducer,
  user: userReducer,
  usersQuery: usersQueryReducer,
  games: gamesReducer,
  // users: usersReducer,
})

const store = createStoreWithMiddleware(reducers);

export default store