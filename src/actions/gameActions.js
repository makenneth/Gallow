import {NEW_GAME,
         SET_ANSWER,
         FETCHED_GAME,
         FETCHED_USERS,
         CREATED_GAME,
         SET_GAME,
         UPDATED_GAME,
         OTHER_CREATED_GAME } from "../constants/constants"

import axios from "axios"

export const fetchUsers = (string) => {
  const req = axios.get(`/api/users?name=${string}`)
  //this function should be implemented with elasticsearch
  return {
    type: FETCHED_USERS,
    payload: req
  }
}

export const createGame = (user1, user2) => {
  const req = axios({
    url: "/api/games/new", 
    method: "post",
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    data: {
      id: 0,
      username1: user1.username,
      username2: user2.username,
      nickname1: user1.nickname,
      nickname2: user2.nickname,
      userId1: user1.id, 
      userId2: user2.id
    }
  })
  return {
    type: CREATED_GAME,
    payload: req
  }
}
export const createdGame = (game) => {
  return {
    type: OTHER_CREATED_GAME,
    payload: game
  }
}

export const updatedGame = (game) => {
  return {
    type: UPDATED_GAME,
    payload: game
  }
}


export const fetchedGameData = (game) => {
  return {
    type: FETCHED_GAME,
    payload: game
  }
}