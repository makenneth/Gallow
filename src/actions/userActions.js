import { LOGGED_IN, LOGGED_OUT } from "../constants/constants"
import axios from "axios"
export const getCurrentUser = () => {
  debugger
  const req = axios.get("/api/user/current")

  return {
    type: LOGGED_IN,
    payload: req
  }
}

export const logOut = () => {
  debugger;
  const req = axios.delete("/api/session")

  return {
    type: LOGGED_OUT,
    payload: req
  }
}