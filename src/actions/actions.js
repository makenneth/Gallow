import { NEW_MESSAGE, NEW_USER, CURRENT_USER, REMOVE_USER, SET_USERS } from "../constants/constants"

export const setCurrentUser = (currentUser) => {
  return {
    type: CURRENT_USER,
    currentUser
  }
}
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users
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

