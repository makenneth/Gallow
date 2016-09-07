import { FETCHED_GAME, 
         USER_GUESS, 
         NEW_GAME, 
         SET_ANSWER,
         FETCHED_USERS,
         CREATED_GAME } from "../constants/constants"
import axios from "axios"
export const fetchUsers = (string) => {
  const req = axios.get(`/api/users?name=${string}`)
  //this function should be implemented with elasticsearch
  return {
    type: FETCHED_USERS,
    payload: req
  }
}

export const createGame = (string) => {
  const req = axios.post("/api/game/new")
  return {
    type: CREATED_GAME,
    payload: req
  }
}

export const fetchGames = () => {
  return {
    type: FETCHED_GAME,
    games
  }
}
export const fetchGame = (id) => {
  //so this should send the same object to all reducers
  const game = axios.get(`/games/${id}`);

  return {
    type: FETCHED_GAME,
    game
  }
}
export const userGuess = (guess) => {
  return {
    type: USER_GUESS,
    guess
  }
} 

export const setAnswer = (answer) => {
  return {
    type: SET_ANSWER,
    answer
  }
}