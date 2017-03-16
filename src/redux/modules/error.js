const CLEAR_ERROR = 'hangperson/error/CLEAR_ERROR';
export const SET_ERROR = 'hangperson/error/SET_ERROR';

export default (state = {
  message: null,
}, action) => {
  switch (action.type) {
    case CLEAR_ERROR:
      return { message: null };
    case SET_ERROR: {
      const message = typeof action.payload === 'object' ? action.payload.message : action.payload;
      return { message };
    }
    default:
      return state;
  }
};

export const setError = (message) => {
  return {
    type: SET_ERROR,
    payload: message,
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};
