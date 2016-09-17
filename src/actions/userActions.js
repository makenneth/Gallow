import { LOGGED_IN, LOGGED_OUT, 
         FETCHED_GAMES, CLEAR_ERROR,
         SET_ERROR, STARTED_LOADING, 
         STOPPED_LOADING } from "../constants/constants"
import axios from "axios"

let intId;
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

export const startLoading = (cb) => {
  intId = setTimeout(() => {
    cb("An error has occured, please reload..")
  }, 5000)
  return {
    type: STARTED_LOADING
  }
}

export const stopLoading = () => {
  if (intId) clearTimeout(intId);
  return {
    type: STOPPED_LOADING
  }
}