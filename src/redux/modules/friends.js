import axios from 'axios';

const ADDED_FRIEND = 'hangperson/friends/ADDED_FRIEND';
const REMOVED_FRIEND = 'hangperson/friends/REMOVED_FRIEND';
const FETCHED_FRIENDS = 'hangperson/friends/FETCHED_FRIENDS';

const initialState = {
  friends: [],
  loaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADDED_FRIEND:
      return {
        ...state,
        friends: [...state.friends, action.payload.data],
      };
    case REMOVED_FRIEND: {
      const friends = [];

      for (let i = 0; i < state.friends.length; i++) {
        const friend = state.friends[i];
        if (friend.id !== action.payload.data) {
          friends.push(friend);
        }
      }

      return {
        ...state,
        friends,
      };
    }
    case FETCHED_FRIENDS:
      return {
        loaded: true,
        friends: action.payload.data,
      };
    default:
      return state;
  }
};

export const addFriend = (user) => {
  const req = axios({
    url: '/api/me/friends',
    method: 'POST',
    data: { user },
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return {
    type: ADDED_FRIEND,
    payload: req,
  };
};

export const unfriend = (user) => {
  const req = axios({
    url: '/api/me/friends',
    method: 'DELETE',
    data: { user },
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return {
    type: REMOVED_FRIEND,
    payload: req,
  };
};

export const loadFriends = () => {
  const req = axios.get('/api/me/friends');
  return {
    type: FETCHED_FRIENDS,
    payload: req,
  };
};

export const isLoaded = (state) => {
  return state.friends.loaded;
};
