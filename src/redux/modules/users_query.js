import axios from 'axios';

const FETCH_USERS = 'hangperson/users_query/FETCH_USERS';
const FETCH_USERS_SUCCESS = 'hangperson/users_query/FETCH_USERS_SUCCESS';
const FETCH_USERS_FAIL = 'hangperson/users_query/FETCH_USERS_FAIL';

export function userQueryReducer(state = [], action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return action.result.data;
    default:
      return state;
  }
};

export const fetchUsers = (string) => {
  return {
    types: [FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL],
    promise: axios.get(`/api/users?name=${string.toLowerCase()}`),
  };
};

export function userSuggestionsReducer(state = [], action) => {
  switch (action.type) {
    case GET_USER_SUGGESTIONS_SUCCESS:
      return action.result.data;
    default:
      return state;
  }
};

export const getUserSuggestions = () => {
  return {
    types: [GET_USER_SUGGESTIONS, GET_USER_SUGGESTIONS_SUCCESS, GET_USER_SUGGESTIONS_FAIL],
    promise: axios.get('/api/user/suggestions'),
  };
};
