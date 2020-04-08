const countInitialState = "";
const countReducer = (state = countInitialState, action) => {
  switch (action.type) {
    case "INCREMENT": {
      return Number(state) + 1;
    }
    default: {
      return state;
    }
  }
};
export default countReducer;
