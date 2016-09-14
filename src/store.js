import { combineReducers, createStore, applyMiddleware } from "redux"
import messagesReducer from "./reducers/messages_reducer"
import userReducer from "./reducers/user_reducer"
import gameReducer from "./reducers/game_reducer"
import usersQueryReducer from "./reducers/users_query_reducer"
import chatScreenReducer from "./reducers/chat_screen_reducer"
import gamesReducer from "./reducers/games_reducer"
import gameInfoReducer from "./reducers/game_info_reducer"
import chatReducer from "./reducers/chat_reducer"
import ReduxPromise from "redux-promise"

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


const reducers = combineReducers({
  messages: messagesReducer,
  user: userReducer,
  usersQuery: usersQueryReducer,
  games: gamesReducer,
  chat: chatReducer,
  game: gameReducer,
  gameInfo: gameInfoReducer,
  chatScreen: chatScreenReducer
})

const store = createStoreWithMiddleware(reducers);

export default store