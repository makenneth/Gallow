import { NEW_MESSAGE } from "../constants/constants"

export const addNewMessage = (msg) => {
  let message = JSON.parse(msg);
  return {
    type: NEW_MESSAGE,
    message
  }
}