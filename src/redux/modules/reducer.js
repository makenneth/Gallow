import { combineReducers } from "redux";
import { reducer as reduxAsyncConnect } from "redux-async-connect";
import messages from "./messages";
import auth from "./auth";
import game from "./game";
import usersQuery from "./users_query";
import chatScreen from "./chat_screen";
import games from "./games";
import gameInfo from "./game_info";
import chat from "./chat";
import error from "./error";
import loading from "./loading";
import friends from "./friends";

export default combineReducers({
  reduxAsyncConnect,
  messages,
  auth,
  usersQuery,
  games,
  chat,
  game,
  gameInfo,
  chatScreen,
  error,
  loading,
  friends
});
