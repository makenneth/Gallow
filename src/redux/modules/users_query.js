import axios from 'axios';

const FETCH_USERS = 'hangperson/users_query/FETCH_USERS';
const FETCH_USERS_SUCCESS = 'hangperson/users_query/FETCH_USERS_SUCCESS';
const FETCH_USERS_FAIL = 'hangperson/users_query/FETCH_USERS_FAIL';
const GET_USER_SUGGESTIONS = 'hangperson/users_query/GET_USER_SUGGESTIONS';
const CLEAR_USER_QUERY = 'hangperson/users_query/CLEAR_USER_QUERY';
const GET_USER_SUGGESTIONS_SUCCESS = 'hangperson/users_query/GET_USER_SUGGESTIONS_SUCCESS';
const GET_USER_SUGGESTIONS_FAIL = 'hangperson/users_query/GET_USER_SUGGESTIONS_FAIL';

export function userQuery(state = [], action) {
  switch (action.type) {
    case CLEAR_USER_QUERY:
      return [];
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

const initialState = {
  suggestions: [],
  isLoading: false,
};
export function userSuggestions(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SUGGESTIONS:
      return {
        suggestions: [],
        isLoading: true,
      };
    case GET_USER_SUGGESTIONS_SUCCESS:
      return {
        suggestions: action.result.data,
        isLoading: false,
      };
    case GET_USER_SUGGESTIONS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
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

export const clearUserQuery = () => {
  return {
    type: CLEAR_USER_QUERY,
  };
};
