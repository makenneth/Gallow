import { FETCHED_GAME, USER_GUESS, NEW_GAME, SET_ANSWER } from "../constants/constants"


export const fetchGame = (id) => {
  //so this should send the same object to all reducers
  const game = axios.get(`/games/${id}`);

  return {
    type: FETCHED_GAME,
    game
  }
}
export const userGuess = (guess) => {
  return {
    type: USER_GUESS,
    guess
  }
} 

export const setAnswer = (answer) => {
  return {
    type: SET_ANSWER,
    answer
  }
}