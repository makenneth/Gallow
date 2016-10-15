import axios from "axios";

const LOAD = "hangperson/games/LOAD";
const LOAD_SUCCESS = "hangperson/games/LOAD_SUCCESS";
const LOAD_FAIL = "hangperson/games/LOAD_FAIL";
const CREATE = "hangperson/games/CREATE";
const CREATE_SUCCESS = "hangperson/games/CREATE_SUCCESS";
const CREATE_FAIL = "hangperson/games/CREATE_FAIL";
const OTHER_CREATED = "hangperson/games/OTHER_CREATED";

const initialState = {
  unfinished: [],
  finished: [],
  loaded: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SUCCESS:
      return {
        ...state,
        ...action.result.data,
        loaded: true
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        unfinished: [...state.unfinished, action.result.data]
      };
    case OTHER_CREATED:
      return {
        ...state,
        unfinished: [...state.unfinished, action.result.data]
      };
    default:
      return state;
  }
};

export const loadGames = () => {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: axios.get("/api/user/games")
  };
};

export const createGame = (user1, user2) => {
  const req = axios({
    url: "/api/games/new",
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    data: {
      id: 0,
      username1: user1.username,
      username2: user2.username,
      nickname1: user1.nickname,
      nickname2: user2.nickname,
      userId1: user1.id,
      userId2: user2.id
    }
  });
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: req
  };
};

export const createdGame = (game) => {
  return {
    type: OTHER_CREATED,
    payload: game
  };
};

export const isGamesLoaded = (state) => {
  return state.games.loaded;
}