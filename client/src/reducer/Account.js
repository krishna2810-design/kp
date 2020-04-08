const accountInitialState = {};
const accountReducer = (state = accountInitialState, action) => {
  switch (action.type) {
    case "SET_ACCOUNT": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
export default accountReducer;
