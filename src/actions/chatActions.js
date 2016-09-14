import { NEW_MESSAGE, FETCHED_MESSAGES, TOGGLE_CHAT } from "../constants/constants"

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

export const toggleChat = () => {
  return {
    type: TOGGLE_CHAT
  }
}