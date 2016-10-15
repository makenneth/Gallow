import { combineReducers } from "redux";
import messagesReducer from "./messages";
import userReducer from "./user";
import gameReducer from "./game";
import usersQueryReducer from "./users_query";
import chatScreenReducer from "./chat_screen";
import gamesReducer from "./games";
import gameInfoReducer from "./game_info";
import chatReducer from "./chat";
import errorReducer from "./error";
import loadingReducer from "./loading";

export default combineReducers({
  messages: messagesReducer,
  user: userReducer,
  usersQuery: usersQueryReducer,
  games: gamesReducer,
  chat: chatReducer,
  game: gameReducer,
  gameInfo: gameInfoReducer,
  chatScreen: chatScreenReducer,
  error: errorReducer,
  loading: loadingReducer
});