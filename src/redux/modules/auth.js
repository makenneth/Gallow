import axios from "axios";

const LOAD = "hangperson/user/LOAD";
const LOAD_SUCCESS = "hangperson/user/LOAD_SUCCESS";
const LOAD_FAIL = "hangperson/user/LOAD_FAIL";
const LOG_OUT = "hangperson/user/LOG_OUT";
const LOG_OUT_SUCCESS = "hangperson/user/LOG_OUT_SUCCESS";
const LOG_OUT_FAIL = "hangperson/user/LOG_OUT_FAIL";

export default (state = { loaded: false }, action) => {
  switch (action.type) {
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        user: action.result.data
      };
    case LOG_OUT:
      return {
        ...state,
        loading: true
      };
    case LOG_OUT_SUCCESS:
      return {
        user: null,
        loading: false
      };
    default:
      return state;
  }
};

export const logOut = () => {
  return {
    types: [LOG_OUT, LOG_OUT_SUCCESS, LOG_OUT_FAIL],
    promise: axios.delete("/api/session")
  };
};

export const loadAuth = () => {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: axios.get("/api/user/current")
  };
};

export const isLoaded = (state) => {
  return state.loaded;
}