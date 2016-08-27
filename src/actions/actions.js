import { NEW_MESSAGE, NEW_USER } from "../constants/constants"

export const setUser = (user) => {
  return {
    type: NEW_USER,
    user
  }
}

export const addNewMessage = (msg) => {
  let message = JSON.parse(msg);
  return {
    type: NEW_MESSAGE,
    message
  }
}