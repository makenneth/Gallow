import axios from "axios";
import { NEW_GAME,
         SET_ANSWER,
         FETCHED_GAME,
         FETCHED_USERS,
         CREATED_GAME,
         SET_GAME,
         UPDATED_GAME,
         OTHER_CREATED_GAME,
         CLEAR_GAME } from "../constants/constants";


export const fetchUsers = (string) => {
  const req = axios.get(`/api/users?name=${string.toLowerCase()}`)
  return {
    type: FETCHED_USERS,
    payload: req
  };
};

export const fetchedGameData = (game) => {
  return {
    type: FETCHED_GAME,
    payload: game
  };
};

export const clearGame = () => {
  return {
    type: CLEAR_GAME
  };
};
