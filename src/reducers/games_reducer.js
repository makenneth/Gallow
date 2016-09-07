import { FETCHED_GAMES, CREATED_GAME } from "../constants/constants"

export default (state = [], action) => {
  switch (action.type){
    case FETCHED_GAMES:
      return action.payload.data;
      
    case CREATED_GAME:
      var newGame = action.payload.data,
          newState = state.map(game => Object.assign({}, game));

      newState.push(newGame);
      return newState;
  }

  return state
}