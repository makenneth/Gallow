const FETCH = "hangperson/user/FETCH";
const FETCH_SUCCESS = "hangperson/user/FETCH_SUCCESS";
const FETCH_FAIL = "hangperson/user/FETCH_FAIL";
const LOG_OUT = "hangperson/user/LOG_OUT";
const LOG_OUT_SUCCESS = "hangperson/user/LOG_OUT_SUCCESS";
const LOG_OUT_FAIL = "hangperson/user/LOG_OUT_FAIL";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      let user = action.payload.data;
      return user;
    case LOG_OUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

export const logOut = () => {
  return {
    type: [LOG_OUT, LOG_OUT_SUCCESS, LOG_OUT_FAIL],
    promise: axios.delete("/api/session")
  };
};

export const getCurrentUser = () => {
  return {
    type: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: axios.get("/api/user/current")
  };
};
