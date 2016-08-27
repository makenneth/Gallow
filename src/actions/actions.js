import { NEW_MESSAGE } from "../constants/constants"

export const submitMessage = (ws, author, body) => {
  const data = {author, body};

  ws.send(JSON.stringify(data));
}

export const addNewMessage = (msg) => {
  let message = JSON.parse(msg);

  return {
    type: NEW_MESSAGE,
    msg
  }
}