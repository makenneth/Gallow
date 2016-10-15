const FETCH = "hangperson/games/FETCH";
const FETCH_SUCCESS = "hangperson/games/FETCH_SUCCESS";
const FETCH_FAIL = "hangperson/games/FETCH_FAIL";
const CREATE = "hangperson/games/CREATE";
const CREATE_SUCCESS = "hangperson/games/CREATE_SUCCESS";
const CREATE_FAIL = "hangperson/games/CREATE_FAIL";
const OTHER_CREATED = "hangperson/games/OTHER_CREATED";

const initialState = {
  unfinished: [],
  finished: [],
  fetched: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return action.payload.data;
    case CREATE_SUCCESS:
      var newState = Object.assign({}, state);
      newState.unfinished = [...state.unfinished, action.payload.data];
      return newState;
    case OTHER_CREATED_GAME:
      var newState = Object.assign({}, state);
      newState.unfinished = [...state.unfinished, action.payload];
      return newState;
    default:
      return state;
  }
};

export const fetchGames = () => {
  return {
    type: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: axios.get("/api/user/games")
  };
};

export const createGame = (user1, user2) => {
  const req = axios({
    url: "/api/games/new",
    method: "post",
    headers: {"Content-Type": "application/json; charset=UTF-8"},
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
    type: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: req
  };
};

export const createdGame = (game) => {
  return {
    type: OTHER_CREATED,
    payload: game
  };
};
