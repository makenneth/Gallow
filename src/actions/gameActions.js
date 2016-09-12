import { FETCHED_GAME, 
         USER_GUESS, 
         NEW_GAME, 
         SET_ANSWER,
         FETCHED_USERS,
         CREATED_GAME,
         SET_GAME,
         UPDATED_GAME } from "../constants/constants"

import axios from "axios"

export const fetchUsers = (string) => {
  const req = axios.get(`/api/users?name=${string}`)
  //this function should be implemented with elasticsearch
  return {
    type: FETCHED_USERS,
    payload: req
  }
}

export const createGame = (userId1, username1, userId2, username2) => {
  //somehow when a game is created.. it has to notify the other side to update
  //probably 
  const req = axios({
    url: "/api/games/new", 
    method: "post",
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    data: {
      id: 0,
      username1: username1,
      username2: username2,
      userId1: userId1, 
      userId2: userId2
    }
  })
  return {
    type: CREATED_GAME,
    payload: req
  }
}

export const fetchGames = (playerId) => {
  const req = axios(`/players/${playerId}/games`)
  return {
    type: FETCHED_GAME,
    payload: games
  }
}

export const updatedGame = (game) => {
  return {
    type: UPDATED_GAME,
    payload: game
  }
}

export const userGuess = (guess) => {
  return {
    type: USER_GUESS,
    guess
  }
} 
export const fetchedGameData = (game) => {
  return {
    type: FETCHED_GAME,
    payload: game
  }
}