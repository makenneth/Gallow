import { startLoading, stopLoading } from "redux/modules/loading";
import { setError, clearError } from "redux/modules/error";

export default ({ dispatch, getState }) => next => action => {
  if (typeof action === "function") {
    return action(dispatch, getState);
  }

  const { promise, types, ...rest } = action;
  if (!promise) {
    return next(action);
  }

  dispatch(startLoading());
  const [REQUEST, SUCCESS, FAILURE] = types;
  next({ ...rest, type: REQUEST });
  promise.then(
    (result) => {
      dispatch(stopLoading());
      next({ ...rest, result, type: SUCCESS })
    },
    (error) => {
      dispatch(setError(error));
      // next({ ...rest, error, type: FAILURE })
    }
  ).catch((error) => {
    dispatch(setError(error));
  });

  return promise;
}