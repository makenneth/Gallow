export const LOAD_STOP = "hangperson/loading/LOAD_STOP";
export const LOAD_START = "hangperson/loading/LOAD_START";

let intId;

export default (state = false, action) => {
  switch (action.type) {
    case LOAD_START:
      return true;
    case LOAD_STOP:
      return false;
    default:
      return state;
  }
};

export const startLoading = (cb) => {
  intId = setTimeout(() => {
    cb("An error has occured, please reload..");
  }, 5000);
  return {
    type: LOAD_START
  };
};

export const stopLoading = () => {
  if (intId) clearTimeout(intId);
  return {
    type: LOAD_STOP
  };
};
