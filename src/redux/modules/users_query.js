const FETCH_USERS = "hangperson/users_query/FETCH_USERS";
const FETCH_USERS_SUCCESS = "hangperson/users_query/FETCH_USERS_SUCCESS";
const FETCH_USERS_FAIL = "hangperson/users_query/FETCH_USERS_FAIL";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      let users = action.payload.data
      return users;
    default:
      return state;
  }
};

export const fetchUsers = (string) => {
  return {
    type: [FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL],
    promise: axios.get(`/api/users?name=${string.toLowerCase()}`)
  };
};
