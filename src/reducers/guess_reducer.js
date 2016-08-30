import { FETCHED_GAME, USER_GUESS, NEW_GAME } from "../constants/constants"
export default (state = {
  guessed: [],
  guessCount: 0,
  guess: ""
}, action) => {
  switch(action.type){
    // case FETCHED_GAME:
    //   return action.game.guesses;
    case USER_GUESS:
      let newState = {};
      for (let key in state) {
        switch(key){
          case "guessed":
            newState[key] = state[key].slice();
            break;
          case "guessCount":
            newState[key] = ++state[key];
            break;
          case "guess":
            newState[key] = state[key];
            break;
        }
      }

      if (state.indexOf(action.guess) !== -1){
        newState.guessed.push(action.guess);
      }

      return newState;
    case NEW_GAME:
      return "";
  }


  return state;
}