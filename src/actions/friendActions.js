import { ADDED_FRIEND, FETCHED_FRIENDS } from "../constants/constants"

export const addFriend = (id, user) => {
  const req = null;
  return {
    type: ADDED_FRIEND,
    payload: req
  }
}

export const fetchFriends = () => {
  const req = null;
  return {
    type: FETCHED_FRIENDS,
    payload: req
  }
}