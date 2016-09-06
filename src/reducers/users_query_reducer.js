export default (state = [], action) => {
  switch (action.type){
    case FETCHED_USERS:
      debugger;
      let users = action.payload.data
      return users;
  }

  return state
}