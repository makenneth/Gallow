import { FETCHED_GAME, USER_GUESS, NEW_GAME } from "../constants/constants"


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
