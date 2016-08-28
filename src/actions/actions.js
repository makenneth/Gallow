import { NEW_MESSAGE, NEW_USER, CURRENT_USER } from "../constants/constants"

export const setCurrentUser = (currentUser) => {
  return {
    type: CURRENT_USER,
    currentUser
  }
}

export const removeUser = (user) => {
  return {
    type: REMOVE_USER,
    user
  }
}
export const addNewUser = (user) => {
  return {
    type: NEW_USER,
    user
  }
}
export const addNewMessage = (message) => {
  return {
    type: NEW_MESSAGE,
    message
  }
}