import { ADDED_FRIEND, FETCHED_FRIENDS } from "../constants/constants"

export default (state = [], action) => {
  switch (action.type) {
    case ADDED_FRIEND:
      return [...state, action.payload.data]
    case FETCHED_FRIENDS:
      return action.payload.data;
    default:
      return state;
  }

  return state;
};

export const addFriend = (id, user) => {
  const req = null;
  return {
    type: ADDED_FRIEND,
    payload: req
  };
};

export const fetchFriends = () => {
  const req = null;
  return {
    type: FETCHED_FRIENDS,
    payload: req
  };
};