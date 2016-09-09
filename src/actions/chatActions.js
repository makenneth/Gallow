import { NEW_MESSAGE, FETCHED_MESSAGES } from "../constants/constants"

export const addNewMessage = (message) => {
  return {
    type: NEW_MESSAGE,
    payload: message
  }
}

export const fetchedMessages = (messages) => {
  return {
    type: FETCHED_MESSAGES,
    payload: messages
  }
}