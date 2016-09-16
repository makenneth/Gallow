import { LOGGED_IN, LOGGED_OUT, 
         FETCHED_GAMES, CLEAR_ERROR,
         SET_ERROR } from "../constants/constants"
import axios from "axios"


export const getCurrentUser = () => {
  const req = axios.get("/api/user/current")

  return {
    type: LOGGED_IN,
    payload: req
  }
}

export const logOut = () => {
  const req = axios.delete("/api/session")
  
  return {
    type: LOGGED_OUT,
    payload: req
  }
}
export const fetchGames = () => {
  const req = axios.get(`/api/user/games`)
  return {
    type: FETCHED_GAMES,
    payload: req
  }
}

export const setError = (message) => {
  return {
    type: SET_ERROR,
    payload: message
  }
}

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  }
}