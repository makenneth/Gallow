import { LOGGED_IN, LOGGED_OUT } from "../constants/constants"
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
export const fetchGames = (playerId) => {
  const req = axios(`/api/user/${playerId}/games`)
  return {
    type: FETCHED_GAME,
    payload: games
  }
}
