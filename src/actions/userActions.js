import { LOG_IN_ERROR, SIGN_IN_ERROR, SIGNED_UP, LOGGED_IN } from "../constants/constants"
import axios from "axios"
export const signUp = (user) => {
  const request = axios.post('/api/user/new', user)

  return {
    type: SIGNED_UP,
    payload: request
  }
}


export const logIn = (user) => {
  const request = axios.post('/api/session/new', user)

  return {
    type: LOGGED_IN,
    payload: request
  }
}