import { fetchedGameData, updatedGame,
  GAME_CONNECTED, MAKE_MOVE, SOLVE_GAME, PLAYER_CONNECTED } from 'redux/modules/game';
import { createdGame } from 'redux/modules/games';
import { addNewMessage, fetchedMessages,
  SEND_MESSAGE } from 'redux/modules/messages';
import { setError } from 'redux/modules/error';

let socket;

export const socketMiddleware = ({ getState }) => next => action => {
  if (!socket) return next(action);
  switch (action.type) {
    case PLAYER_CONNECTED: {
      const user = getState().auth.user;
      socket.send(JSON.stringify({
        type: 'USER_CONNECTED',
        data: {
          username: user.username,
          nickname: user.nickname,
        },
      }));
      break;
    }
    case GAME_CONNECTED:
      socket.send(JSON.stringify({
        type: 'GAME_CONNECTED',
        data: +action.payload,
      }));
      break;
    case SEND_MESSAGE:
      socket.send(JSON.stringify({
        type: 'NEW_MESSAGE',
        data: action.payload,
      }));
      break;
    case SOLVE_GAME: {
      const state = getState();
      socket.send(JSON.stringify({
        type: 'SOLVE_GAME',
        data: {
          id: state.gameInfo.id,
          userId: state.user.id,
        },
      }));
      break;
    }
    case MAKE_MOVE: {
      const { gameInfo } = getState();
      socket.send(JSON.stringify({
        type: 'USER_MOVE',
        data: {
          username1: gameInfo.username1,
          username2: gameInfo.username2,
          nickname1: gameInfo.nickname1,
          nickname2: gameInfo.nickname2,
          userId1: gameInfo.userId1,
          userId2: gameInfo.userId2,
          id: gameInfo.id,
          state: {
            guess: action.payload,
          },
        },
      }));
      break;
    }
    default:
      break;
  }

  return next(action);
};

export default ({ getState, dispatch }) => {
  const url = `${process.env.WS_URL}/ws`;
  socket = new WebSocket(url);

  const messageHandler = (res) => {
    const message = JSON.parse(res.data);
    switch (message.type) {
      case 'GAME_CONNECTED':
        dispatch(fetchedGameData(message.data));
        break;
      case 'MOVE_MADE':
      case 'GAME_FINISHED':
        dispatch(updatedGame(message.data));
        break;
      case 'NEW_MESSAGE':
        dispatch(addNewMessage(message.data));
        break;
      case 'FETCHED_MESSAGES':
        dispatch(fetchedMessages(message.data));
        break;
      case 'CREATED_GAME':
        dispatch(createdGame(message.data));
        break;
      default:
        break;
    }
  };
  socket.onmessage = messageHandler;
  socket.onclose = () => dispatch(setError('Connection lost, please try again later...'));
};
